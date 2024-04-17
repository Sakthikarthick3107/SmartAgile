from rest_framework import serializers
from django.contrib.auth.models import User
from .models import UserProfile
from rest_framework.exceptions import ValidationError

class UserSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)

    class Meta:
        model = User
        fields = ['username','password','email']

    def create(self, validated_data):
        user = User.objects.create(
            username = validated_data['username'],
            email = validated_data['email']
        )
        user.set_password(validated_data['password'])
        user.save()
        return user
    def validate_email(self,value):
        if User.objects.filter(email = value).exists():
            raise ValidationError('A user with that email already exist!')
        return value
    
class LoginSerializer(serializers.Serializer):  
     email = serializers.EmailField()
     password = serializers.CharField(style={'input_type': 'password'})


class PasswordResetRequestSerializer(serializers.Serializer):
    email = serializers.EmailField(required=True)

    def validate(self, data):
        email = data.get('email')
        try:
            user = User. objects.get(email=email)
            # if not user.has_usable_password():
            #     raise serializers.ValidationError('Invalid data')
        except User.DoesNotExist:
            raise serializers.ValidationError('Email address not found !')
        return data
    
class PasswordResetConfirmOtpSerializer(serializers.Serializer):
    otp = serializers.IntegerField(required=True)

    def validate(self, data):
        try:
            otp = data.get('otp')
            user = User.objects.get(otp=otp)
            if not user:
                raise serializers.ValidationError('Invalid OTP')
        except User.DoesNotExist:
            raise serializers.ValidationError('Invalid OTP')
        return data

class PasswordResetConfirmSerializer(serializers.Serializer):
    otp = serializers.IntegerField(required=True)
    new_password = serializers.CharField(required=True,write_only=True)
    confirm_password = serializers.CharField(required=True, write_only=True)

    def validate(self, data):
        otp = data.get('otp')
        new_password = data.get('new_password')
        confirm_password = data.get('confirm_password')

        if not new_password or not confirm_password:
            raise serializers.ValidationError('Passwords are required')
        
        if len(new_password) < 8:
            raise serializers.ValidationError('Password must be at least 8 characters long')
        
        if new_password != confirm_password:
            raise serializers.ValidationError('Passwords do not match')
        try:
            user = User.objects.get(otp=otp)
        except User.DoesNotExist:
            raise serializers.ValidationError('Invalid OTP')
        return data
    
    def update(self, instance, validated_data):
        user = User.objects.get(otp=validated_data['otp'])
        user.set_password(validated_data['new_password'])
        user.otp = None
        user.save()
        return user
         
class SuperuserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id','username','password','email']

    def create(self,validated_data):
        user = User.objects.create_superuser(
            username = validated_data['username'],
            email = validated_data['email']
        )
        user.set_password(validated_data['password'])
        user.save()
        return user 

    def validate_email(self,value):
        if User.objects.filter(email = value).exists():
            raise ValidationError('A Superuser with that email already exist!')
        return value  

class UserProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserProfile
        fields = '__all__'