from django.conf import settings
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework_simplejwt.tokens import Token
from .models import UserProfile
from .serializers import UserSerializer , SuperuserSerializer, UserProfileSerializer , LoginSerializer, PasswordResetConfirmSerializer, PasswordResetRequestSerializer
from rest_framework import status
from django.contrib.auth import authenticate
from django.contrib.auth.models import User
from drf_spectacular.utils import extend_schema
from rest_framework.generics import ListCreateAPIView , RetrieveUpdateDestroyAPIView, GenericAPIView, UpdateAPIView
from django.core.mail import send_mail
import secrets
from rest_framework import serializers

base_url = 'http://127.0.0.1:8000'

def generate_password_reset_otp():
    return ''.join([str(secrets.choice('0123456789')) for i in range(6)])

# from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
# from rest_framework_simplejwt.views import TokenObtainPairView
# from rest_framework.authtoken.models import Token
# from rest_framework_simplejwt.tokens import AccessToken, RefreshToken

# class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
#     @classmethod
#     def get_token(cls, user):
#         token =  super().get_token(user)
#         token['username'] = user.username
#         token['username'] = user.username
#         return token
    
# class MyTokenObtainPairView(TokenObtainPairView):
#     serializer_class = MyTokenObtainPairSerializer

class UsersView(ListCreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer

class UserEditUpdateDeleteView(RetrieveUpdateDestroyAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    lookup_field = 'id'

@extend_schema(request=LoginSerializer)
class LoginView(APIView):
    def post(self,request):
        email = request.data.get('email')
        password = request.data.get('password')

        user = authenticate(username=email,password=password)

        if not user:
            return Response({'error' : 'Invalid Credentials'},status=status.HTTP_400_BAD_REQUEST)
        
            
        try:
            profile = UserProfile.objects.select_related('organization').get(user=user)
            organization = profile.organization
            is_owner = organization.owner == user
        except UserProfile.DoesNotExist:
            return Response({'error': 'User has no profile associated'}, status=status.HTTP_404_NOT_FOUND)
        
        # access_token = AccessToken.for_user(user)
        # refresh_token = RefreshToken.for_user(user)
        return Response({
            # 'access_token' : str(access_token),
            # 'refresh_token' : str(refresh_token),
            'username' : user.username,
            'email' : email,
            'organization':organization.org_name,
            'is_owner' : is_owner,
            'message' : 'Logged in successfully',
            'is_staff' : user.is_staff
                    },status=status.HTTP_200_OK)
    
class PasswordResetRequestView(GenericAPIView):
    serializer_class = PasswordResetRequestSerializer

    def post(self, request):
        serializer = self.get_serializer(data=request.data)
        if serializer.is_valid():
            email = serializer.validated_data['email']
            user = User.objects.filter(email=email).first()
            if user:
                otp = generate_password_reset_otp()
                user.otp = otp
                user.save()

                subject = 'Password Reset Request'
                text_content = f"""Your password reset code is : {otp}
                Click here to reset your password : {base_url}/auth/password_reset/confirm/{user.id}/{otp}/""",
                from_email = settings.EMAIL_HOST_USER
                to_email = [user.email]

                send_mail(subject, text_content, from_email, to_email)
                
            return Response({'message' : 'Password reset link has been sent to your email'},status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
class PasswordResetConfirmView(UpdateAPIView):
    serializer_class = PasswordResetConfirmSerializer

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid()

        validated_data = serializer.validated_data
        user = User.objects.get(pk=validated_data['uid'])

        if user.otp != validated_data['code']:
            raise serializers.ValidationError('Invalid OTP')
        
        user.set_password(validated_data['new_password'])
        user.otp = None
        user.save()
        serializer.save()

        return Response({'message' : 'Password Reset Successful'}, status=status.HTTP_200_OK)
        

class SuperuserCreate(ListCreateAPIView):
    queryset = User.objects.all()
    serializer_class = SuperuserSerializer

class SuperuserViewEditDelete(RetrieveUpdateDestroyAPIView):
    queryset = User.objects.all()
    serializer_class = SuperuserSerializer  
    lookup_field = 'id'
    
class UserProfileCreate(ListCreateAPIView):
    queryset = UserProfile.objects.all()
    serializer_class = UserProfileSerializer