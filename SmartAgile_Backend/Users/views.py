from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework_simplejwt.tokens import Token
from .models import UserProfile
from .serializers import UserSerializer , SuperuserSerializer, UserProfileSerializer , LoginSerializer
from rest_framework import status
from django.contrib.auth import authenticate
from django.contrib.auth.models import User
from drf_spectacular.utils import extend_schema
from rest_framework.generics import ListCreateAPIView , RetrieveUpdateDestroyAPIView

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