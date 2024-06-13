from rest_framework.response import Response
from rest_framework import status
from drf_spectacular.utils import extend_schema
from .serializers import TaskSerializer
from rest_framework.views import APIView
from .models import Task
from Users.models import UserProfile
from Projects.models import ProjectMembers, Project
from Users.serializers import UserProfileSerializer
from Projects.serializers import ProjectMemberSerializer

@extend_schema(request=TaskSerializer, responses=TaskSerializer)
class TaskView(APIView):
    def get(self, request , task_id=None ):
        if task_id is not None:
            try:
                task = Task.objects.get(task_id = task_id)
                serializer = TaskSerializer(task)
                return Response(serializer.data, status=status.HTTP_200_OK)
            except Task.DoesNotExist:
                return Response({'message' : 'Task Not found'}, status=status.HTTP_400_BAD_REQUEST)
        
        
                
        task = Task.objects.all()
        serializer = TaskSerializer(task,many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def post(self,request):
        serializer = TaskSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({'message' : 'Task Created Successfully'}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors,status=status.HTTP_400_BAD_REQUEST)
    
    def put(self,request,task_id):
        try:
            task = Task.objects.get(task_id = task_id)
        except Task.DoesNotExist:
            return Response({'message' : 'Task Not found'}, status=status.HTTP_400_BAD_REQUEST)
        
        serializer = TaskSerializer(task, data = request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    def delete(self,request,task_id):
        try:
            task = Task.objects.get(task_id = task_id)
            task.delete()
            return Response({'message' : 'Task Deleted Successfully'},status=status.HTTP_200_OK)
        except Task.DoesNotExist:
            return Response({'message' : 'Task Not found'}, status=status.HTTP_400_BAD_REQUEST)
        
class Project_Task(APIView):
    def get(self,request,proj_id , task_priority = None):
        if task_priority is not None and proj_id is not None:
            task = Task.objects.filter(project=proj_id)
            priority_task = task.filter(task_priority = task_priority)
            priority_serializer = TaskSerializer(priority_task , many=True)
            return Response(priority_serializer.data , status=status.HTTP_200_OK) 
        
        elif proj_id is not None:
            try:
                task = Task.objects.filter(project=proj_id)
                serializer = TaskSerializer(task,many=True)     
                return Response(serializer.data,status=status.HTTP_200_OK)  
            except Task.DoesNotExist:
                return Response({'message':'Task Not found'},status=status.HTTP_400_BAD_REQUEST)
          
        
class UserTaskListView(APIView):
    def get(self, request, proj_id, user_id):
        try:
            user_data = UserProfile.objects.get(user = user_id)
            if(user_data):
                user_data_serializer = UserProfileSerializer(user_data)
                serialized_user_data = user_data_serializer.data

                user_profile_id = serialized_user_data['id']
                project_members = ProjectMembers.objects.get(profile=user_profile_id, project=proj_id)
                if(project_members):
                    project_member_serializer = ProjectMemberSerializer(project_members)

                    project_member_id = project_member_serializer.data['id']
                    task_data = Task.objects.filter(project=proj_id, assigned_to = project_member_id)
                    if(task_data):
                        task_serializer = TaskSerializer(task_data, many=True)
                        return Response(task_serializer.data)
                    else:
                        return Response('Task not found', status=status.HTTP_404_NOT_FOUND)
                else:
                    return Response('Project Member not found', status=status.HTTP_404_NOT_FOUND)
            else:
                return Response('User not found', status=status.HTTP_404_NOT_FOUND)
        except Task.DoesNotExist:
            return Response('Incorrect Credentials', status=status.HTTP_400_BAD_REQUEST)