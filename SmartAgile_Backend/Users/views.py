from rest_framework.views import APIView
from rest_framework.response import Response
from .serializers import UserSerializer
from rest_framework import status
from django.contrib.auth import authenticate
from django.contrib.auth.models import User

class RegisterView(APIView):

    def get(self,request):
        username = User.objects.all()
        serializer = UserSerializer(username,many=True)
        return Response(serializer.data)

    def post(self,request):     
        
        serializer = UserSerializer(data=request.data)

        if serializer.is_valid():
            serializer.save()
            return Response({'message' : 'User registration successful'}, status=status.HTTP_201_CREATED)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
class LoginView(APIView):
    def post(self,request):
        username = request.data.get('username')
        password = request.data.get('password')

        user = authenticate(username=username,password=password)

        if not user:
            return Response({'error' : 'Invalid Credentials'},status=status.HTTP_400_BAD_REQUEST)
        else:

            return Response({
                    'username' : username,
                    'message' : 'Logged in successfully',
                    'is_staff' : user.is_staff
                    },status=status.HTTP_200_OK)
        
    