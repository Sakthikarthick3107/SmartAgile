from rest_framework.response import Response
from rest_framework import status
from drf_spectacular.utils import extend_schema
from .serializers import ProjectSerializer , ProjectMemberSerializer, ProjectMemberCreateSerializer
from rest_framework.views import APIView
from .models import Project , ProjectMembers
from Users.models import User, UserProfile
from rest_framework.decorators import api_view
# from rest_framework.generics import ListCreateAPIView ,RetrieveUpdateDestroyAPIView


@api_view(['GET'])
def status_choices(request):
    statuses = dict(Project.STATUS_CHOICES)
    return Response(statuses)

@extend_schema(request=ProjectMemberSerializer, responses=ProjectMemberSerializer)
class ProjectMemberListView(APIView):
    def get(self, request, id):
        try:
            projectMember = ProjectMembers.objects.get(pk = id)
            serializer = ProjectMemberSerializer(projectMember)
            return Response(serializer.data, status=status.HTTP_200_OK)
        except ProjectMembers.DoesNotExist:
            return Response('Project Member Does not exist', status=status.HTTP_400_BAD_REQUEST)


@extend_schema(request=ProjectMemberSerializer , responses=ProjectMemberSerializer)
class ProjectMemberView(APIView):
    def get(self,request,project=None):
        if project is not None:
            members = ProjectMembers.objects.filter(project = project)
            members_serializer = ProjectMemberSerializer(members , many=True)
            return Response(members_serializer.data)
        members = ProjectMembers.objects.all()
        members_serializer = ProjectMemberSerializer(members , many=True)
        return Response(members_serializer.data)
    
@extend_schema(request=ProjectMemberCreateSerializer , responses=ProjectMemberCreateSerializer)
class ProjectMemberCreateView(APIView):
    def post(self,request):
        serializer = ProjectMemberCreateSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({'message' : 'Project Members added successfully'} , status=status.HTTP_201_CREATED)
        return Response(serializer.errors , status=status.HTTP_400_BAD_REQUEST)

@extend_schema(request=ProjectSerializer, responses=ProjectSerializer)
class ProjectView(APIView):
    def get(self,request, proj_id=None ,organization = None ):
        if proj_id is not None:
            try:
                project = Project.objects.get(proj_id= proj_id)
                serializer = ProjectSerializer(project)
                return Response(serializer.data, status=status.HTTP_200_OK)
            except Project.DoesNotExist:
                return Response({'message' : 'Project Not found'}, status=status.HTTP_400_BAD_REQUEST)
        elif organization is not None:
            try:
                org_proj = Project.objects.filter(organization = organization)
                serializer = ProjectSerializer(org_proj , many=True)
                return Response(serializer.data)
            except Project.DoesNotExist:
                return Response({'error' : 'Error'} , status=status.HTTP_400_BAD_REQUEST)
        
        project = Project.objects.all()
        serializer = ProjectSerializer(project,many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def post(self,request):
        serializer = ProjectSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({'message' : 'Project Created Successfully', 'serializer' : serializer.data}, status=status.HTTP_200_OK)
        return Response(serializer.errors,status=status.HTTP_400_BAD_REQUEST)
    
    def put(self,request,proj_id):
        try:
            project = Project.objects.get(pk=proj_id)
        except Project.DoesNotExist:
            return Response({'message' : 'Project Not found'}, status=status.HTTP_400_BAD_REQUEST)
        
        serializer = ProjectSerializer(project, data = request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    def delete(self,request,proj_id):
        try:
            project = Project.objects.get(pk=proj_id)
            project.delete()
            return Response({'message' : 'Project Deleted Successfully'},status=status.HTTP_200_OK)
        except Project.DoesNotExist:
            return Response({'message' : 'Project Not found'}, status=status.HTTP_400_BAD_REQUEST)

class UserProjectView(APIView):
    def get(self, request, user_id):
        try:
            user = User.objects.get(pk = user_id)
        except User.DoesNotExist:
            return Response('User not fount', status=status.HTTP_404_NOT_FOUND)
        
        projects = Project.objects.filter(proj_members__profile__user=user).select_related('organization')

        serializer = ProjectSerializer(projects, many = True)
        return Response(serializer.data)
    
class ProjectMemberDetailView(APIView):
    def get(self, request, proj_id, id):
        try:
            user_profile = UserProfile.objects.get(user=id)

            project_member = ProjectMembers.objects.filter(profile=user_profile, project=proj_id)

            if not project_member.exists():
                return Response({'message': 'Project members not found for the specified project'}, status=status.HTTP_404_NOT_FOUND)
            
            serializer = ProjectMemberSerializer(project_member, many=True)
            return Response(serializer.data)
        except UserProfile.DoesNotExist:
            return Response({'message': 'User profile not found'}, status=status.HTTP_404_NOT_FOUND)
        except ProjectMembers.DoesNotExist:
            return Response({'message': 'Project members not found'}, status=status.HTTP_404_NOT_FOUND)