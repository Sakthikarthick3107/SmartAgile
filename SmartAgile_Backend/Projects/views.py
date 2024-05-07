from rest_framework.response import Response
from rest_framework import status
from drf_spectacular.utils import extend_schema
from .serializers import ProjectSerializer , ProjectMemberSerializer
from rest_framework.views import APIView
from .models import Project , ProjectMembers
from rest_framework.decorators import api_view
from rest_framework.generics import ListCreateAPIView , RetrieveAPIView,ListAPIView


@api_view(['GET'])
def status_choices(request):
    statuses = dict(Project.STATUS_CHOICES)
    return Response(statuses)


class ProjectMemberView(ListAPIView):
    queryset = ProjectMembers.objects.all()
    serializer_class = ProjectMemberSerializer
    lookup_field = 'project'

@extend_schema(request=ProjectSerializer, responses=ProjectSerializer)
class ProjectView(APIView):
    def get(self,request, proj_id=None ,organization = None ):
        if proj_id is not None:
            try:
                project = Project.objects.get(proj_id= proj_id)
                serializer = ProjectSerializer(project)
                return Response(serializer.data, status=status.HTTP_200_OK)
            except project.DoesNotExist:
                return Response({'message' : 'Project Not found'}, status=status.HTTP_400_BAD_REQUEST)
        elif organization is not None:
            try:
                org_prjs = Project.objects.filter(organization = organization)
                serializer = ProjectSerializer(org_prjs , many=True)
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
            return Response({'message' : 'Project Created Successfully'}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors,status=status.HTTP_400_BAD_REQUEST)
    
    def put(self,request,id):
        try:
            project = Project.objects.get(id=id)
        except project.DoesNotExist:
            return Response({'message' : 'Project Not found'}, status=status.HTTP_400_BAD_REQUEST)
        
        serializer = ProjectSerializer(project, data = request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    def delete(self,request,id):
        project = Project.objects.get(id=id)
        try:
            project.delete()
            return Response({'message' : 'Project Deleted Successfully'},status=status.HTTP_200_OK)
        except project.DoesNotExist:
            return Response({'message' : 'Project Not found'}, status=status.HTTP_400_BAD_REQUEST)

