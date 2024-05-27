from django.conf import settings
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework_simplejwt.tokens import Token
from .models import UserProfile, User
from .serializers import UserSerializer , SuperuserSerializer , LoginSerializer, UserProfileSerializer
from rest_framework import status
from django.contrib.auth import authenticate
from drf_spectacular.utils import extend_schema
from rest_framework.generics import ListCreateAPIView , RetrieveUpdateDestroyAPIView , ListAPIView
from rest_framework.decorators import api_view
from django_filters.rest_framework import DjangoFilterBackend
from .filter import UserProfileFilter

# from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
# from rest_framework_simplejwt.views import TokenObtainPairView
# from rest_framework.authtoken.models import Token
# from rest_framework_simplejwt.tokens import AccessToken, RefreshToken

# class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
#     @classmethod
#     def get_token(cls, user):
#         token =  super().get_token(user)
#         token['username'] = user.username
#         token['email'] = user.email
#         return token
    
# class MyTokenObtainPairView(TokenObtainPairView):
#     serializer_class = MyTokenObtainPairSerializer
@api_view(['GET'])
def position_choices(request):
    positions = dict(UserProfile.POSITION_CHOICES)
    return Response(positions)

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

        user = authenticate(email=email,password=password)
        print(user)

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
            'user_id' : user.pk,
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
#     serializer_class = UserProfileSerializers

class UserProfileListFilter(ListAPIView):
    queryset = UserProfile.objects.all()
    serializer_class = UserProfileSerializer
    filter_backends = [DjangoFilterBackend]
    filterset_class = UserProfileFilter

@extend_schema(request=UserProfileSerializer,responses=UserProfileSerializer)
class UserProfileCreate(APIView):
    def get(self,request,organization,id=None,position=None):
        if id is not None:
            try:
                user_profile_id = UserProfile.objects.get(id=id , organization=organization)
                user_serialize_id = UserProfileSerializer(user_profile_id)
                return Response(user_serialize_id.data,status=status.HTTP_200_OK)
            except UserProfile.DoesNotExist:
                return Response({"error":"Invalid Credentials"},status=status.HTTP_400_BAD_REQUEST)
            
        elif position is not None:
            try:
               user_position = UserProfile.objects.filter(position = position,organization=organization)
               profile_serializer = UserProfileSerializer(user_position , many=True)
               return Response(profile_serializer.data ,status=status.HTTP_200_OK)
           
            except UserProfile.DoesNotExist:
                return Response({"error":"Failed to get request"},status=status.HTTP_400_BAD_REQUEST)
           
        user_profile = UserProfile.objects.filter(organization=organization)
        user_serializer = UserProfileSerializer(user_profile,many=True)
        return Response(user_serializer.data, status=status.HTTP_200_OK)
    
    def post(self,request):
        user_profile_post = UserProfileSerializer(data=request.data)
        if user_profile_post.is_valid():
            user_profile_post.save()
            return Response({"message":"Successfully created"},status=status.HTTP_201_CREATED)
        return Response(user_profile_post.errors,status=status.HTTP_400_BAD_REQUEST)
    
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
                "data":user_profile_put.data},status=status.HTTP_200_OK)
        return Response(user_serializer_put.errors,status=status.HTTP_400_BAD_REQUEST)
    
    def delete(self,request,id):
        user_profile_delete = UserProfile.objects.get(id=id)
        try:
            user_profile_delete.delete()
            return Response({
                "message":"Successfully deleted"
            },status=status.HTTP_200_OK)
        except user_profile_delete.DoesNotExist:
            return Response({
                "error":"Invalid Credentials"
            },status=status.HTTP_400_BAD_REQUEST)
