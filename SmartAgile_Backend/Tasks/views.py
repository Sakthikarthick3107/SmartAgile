from rest_framework.response import Response
from rest_framework import status
from drf_spectacular.utils import extend_schema
from .serializers import TaskSerializer
from rest_framework.views import APIView
from .models import Task

@extend_schema(request=TaskSerializer, responses=TaskSerializer)
class TaskView(APIView):
    def get(self, request , task_id=None):
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