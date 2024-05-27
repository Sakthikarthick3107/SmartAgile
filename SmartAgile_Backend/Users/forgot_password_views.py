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
            return Response({'message' : 'Password reset link has been sent to your email', 'unique_token': unique_token, 'id': user.pk}, status=status.HTTP_200_OK,)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
class PasswordResetConfirmOtpView(UpdateAPIView):
    serializer_class = PasswordResetConfirmOtpSerializer

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        print(serializer)
        if not serializer.is_valid():
            return Response({'message' : 'Invalid Otp'}, status=status.HTTP_400_BAD_REQUEST)
        else:
            validated_data = serializer.validated_data
            otp = validated_data['otp']

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
                return Response({'message' : 'User not found'}, status=status.HTTP_400_BAD_REQUEST)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)