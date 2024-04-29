from .utils import generate_password_reset_otp, send_password_reset_email
import os
from .serializers import PasswordResetConfirmSerializer, PasswordResetRequestSerializer, PasswordResetConfirmOtpSerializer
from rest_framework.generics import GenericAPIView, UpdateAPIView
from .models import User
from rest_framework.response import Response
from rest_framework import status
from rest_framework.views import APIView 
from rest_framework import serializers

class PasswordResetRequestView(GenericAPIView):
    serializer_class = PasswordResetRequestSerializer

    def post(self, request):
        serializer = self.get_serializer(data=request.data)
        if serializer.is_valid():
            email = serializer.validated_data['email']
            user = User.objects.filter(email=email).first()
            if user:
                unique_token = os.urandom(32).hex()
                user.otp = generate_password_reset_otp()
                user.save()

                send_password_reset_email(user, user.pk, unique_token)
            return Response({'message' : 'Password reset link has been sent to your email'},status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
<<<<<<< HEAD
class PasswordResetConfirmOtpView(UpdateAPIView):
    serializer_class = PasswordResetConfirmOtpSerializer

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        if not serializer.is_valid():
            return Response({'message' : 'Invalid Otp'}, status=status.HTTP_400_BAD_REQUEST)
        else:
            validated_data = serializer.validated_data
            otp = validated_data['otp']
=======
class PasswordResetConfirmOtpView(APIView):
    serializer_class = PasswordResetConfirmOtpSerializer

    def post(self, request, *args, **kwargs):
        serializer = self.serializer_class(data=request.data)
        if not serializer.is_valid():
            errors = serializer.errors
            error_message = str(errors)  # Convert errors to string for better readability
            raise serializers.ValidationError(error_message)
       
        validated_data = serializer.validated_data
        otp = validated_data['otp']
>>>>>>> 032554f6ade1dcabae31517cbc1d1a6edcc9cbe9

        try:
            user = User.objects.get(otp=otp)
            if not user:
                raise serializers.ValidationError('Invalid OTP')
        except User.DoesNotExist:
            raise serializers.ValidationError('Invalid OTP')
        
        return Response({'message' : 'OTP verified. Proceed to password reset'}, status=status.HTTP_200_OK)

class PasswordResetConfirmView(UpdateAPIView):
    serializer_class = PasswordResetConfirmSerializer

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        if serializer.is_valid():
            validated_data = serializer.validated_data
            otp = validated_data['otp']

            try:
                user = User.objects.get(otp=otp)              
                user.set_password(validated_data['new_password'])
                user.otp = None
                user.save()
                return Response({'message' : 'Password Reset Successful'}, status=status.HTTP_200_OK)
            except User.DoesNotExist:
<<<<<<< HEAD
                return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
=======
                return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        
>>>>>>> 032554f6ade1dcabae31517cbc1d1a6edcc9cbe9
