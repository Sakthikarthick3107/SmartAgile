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
    
     username = serializers.EmailField()
     password = serializers.CharField(style={'input_type': 'password'})
         
class SuperuserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['username','password','email']

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