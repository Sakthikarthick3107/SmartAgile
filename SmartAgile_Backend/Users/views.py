from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework_simplejwt.tokens import Token
from .serializers import UserSerializer , SuperuserSerializer
from rest_framework import status
from django.contrib.auth import authenticate
from django.contrib.auth.models import User
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

class LoginView(APIView):
    def post(self,request):
        email = request.data.get('email')
        password = request.data.get('password')

        user = authenticate(username=email,password=password)

        if not user:
            return Response({'error' : 'Invalid Credentials'},status=status.HTTP_400_BAD_REQUEST)
        else:
            # access_token = AccessToken.for_user(user)
            # refresh_token = RefreshToken.for_user(user)
            return Response({
                    # 'access_token' : str(access_token),
                    # 'refresh_token' : str(refresh_token),
                    'username' : user.username,
                    'email' : email,
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
    