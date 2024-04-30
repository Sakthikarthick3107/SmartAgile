from django.db import models

# Create your models here.
from Projects.models import Project

class Task(models.Model):
    project = models.ForeignKey(Project, related_name='project_tasks', on_delete=models.CASCADE)
    task_id = models.AutoField(primary_key=True)
    task_name = models.CharField(max_length=100, unique=True)
    task_deadline = models.CharField(max_length=10)
    task_priority = models.CharField(max_length=15)
    task_desc = models.CharField(max_length=255)
