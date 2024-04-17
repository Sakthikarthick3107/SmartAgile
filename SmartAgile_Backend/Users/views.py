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
            'organization':organization.org_id,
            'is_owner' : is_owner,
            'message' : 'Logged in successfully',
            'is_staff' : user.is_staff
                    },status=status.HTTP_200_OK)

class SuperuserCreate(ListCreateAPIView):
    queryset = User.objects.all()
    serializer_class = SuperuserSerializer

class SuperuserViewEditDelete(RetrieveUpdateDestroyAPIView):
    queryset = User.objects.all()
    serializer_class = SuperuserSerializer  
    lookup_field = 'id'
    
# class UserProfileCreate(ListCreateAPIView):
#     queryset = UserProfile.objects.all()
#     serializer_class = UserProfileSerializer
@extend_schema(request=UserProfileSerializer,responses=UserProfileSerializer)
class UserProfileCreate(APIView):
    def get(self,request,id=None):
        if id is not None:
            try:
                user_profile_id = UserProfile.objects.get(id=id)
                user_serialize_id = UserProfileSerializer(user_profile_id)
                return Response(user_serialize_id.data)
            except UserProfile.DoesNotExist:
                return Response({"error":"Invalid Credentials"},status=status.HTTP_400_BAD_REQUEST)
            
        user_profile = UserProfile.objects.all()
        user_serializer = UserProfileSerializer(user_profile,many=True)
        return Response(user_serializer.data)
    
    def post(self,request):
        user_profile_post = UserProfileSerializer(data=request.data)
        if user_profile_post.is_valid():
            user_profile_post.save()
            return Response({"message":"Successfully created"},status=status.HTTP_201_CREATED)
        return Response(user_profile_post.errors)
    
    def put(self,request,id):
        try:
            user_profile_put = UserProfile.objects.get(id=id)
        except user_profile_put.DoesNotExist:
            return Response({"error":"Invalid Credentials"},status=status.HTTP_400_BAD_REQUEST)
            
        user_serializer_put = UserProfileSerializer(user_profile_put,data=request.data)
        if user_serializer_put.is_valid():
            user_serializer_put.save()
            return Response({
                "message":"Updated Successfully",
                "data":user_profile_put.data})
        return Response(user_serializer_put.errors)
    
    def delete(self,request,id):
        user_profile_delete = UserProfile.objects.get(id=id)
        try:
            user_profile_delete.delete()
            return Response({
                "message":"Successfully deleted"
            })
        except user_profile_delete.DoesNotExist:
            return Response({
                "error":"Invalid Credentials"
            },status=status.HTTP_400_BAD_REQUEST)
            
        
    
        
