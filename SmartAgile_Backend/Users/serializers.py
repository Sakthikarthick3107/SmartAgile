from rest_framework import serializers
from django.contrib.auth.models import User
from .models import UserProfile
from rest_framework.exceptions import ValidationError
from rest_framework_simplejwt.tokens import RefreshToken

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
     username = serializers.EmailField()
     password = serializers.CharField(style={'input_type': 'password'})


class PasswordResetRequestSerializer(serializers.Serializer):
    email = serializers.EmailField(required=True)

    def validate(self, data):
        email = data.get('email')
        try:
            user = User. objects.get(email=email)
            if not user.has_usable_password():
                raise serializers.ValidationError('Invalid data')
        except User.DoesNotExist:
            raise serializers.ValidationError('Email address not found')
        return data

class PasswordResetConfirmSerializer(serializers.Serializer):
    uid = serializers.CharField(required=True)
    token = serializers.CharField(required=True)
    new_password = serializers.CharField(required=True,write_only=True)
    confirm_password = serializers.CharField(required=True, write_only=True)

    def validate(self, data):
        try:
            uid = data.get('uid', None)
            token = data.get('token', None)
            user = User.objects.get(pk=uid)
            if not user.has_usable_password():
                raise serializers.ValidationError('Invalid state')
            if not RefreshToken(token).is_valid():
                raise serializers.ValidationError('Invalid token')
        except (User.DoesNotExist, ValueError):
            raise serializers.ValidationError('Invalid uid/token')
        
        new_password = data.get('new_password')
        confirm_password = data.get('confirm_password')
        if new_password != confirm_password:
            raise serializers.ValidationError('Passwords do not match')
        return data
    
    def update(self, instance, validated_data):
        user = User.objects.get(pk=validated_data['uid'])
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