from django.db import models
# Create your models here.
from Projects.models import Project, ProjectMembers

class Task(models.Model):
    PRIORITY_CHOICES = [
        ('LOW', 'Low'),
        ('MED', 'Medium'),
        ('HIGH', 'High'),
    ]
    STATUS_CHOICES = [
        ('Todo', 'To-do'),
        ('Progress', 'Inprogress'),
        ('Completed', 'Completed')
    ]
    project = models.ForeignKey(Project, related_name='project_tasks', on_delete=models.CASCADE)
    assigned_to = models.ForeignKey(ProjectMembers,related_name='project_member', on_delete=models.CASCADE,blank=True,null=True)
    task_id = models.AutoField(primary_key=True)
    task_name = models.CharField(max_length=100, unique=True)
    task_deadline = models.DateField()
    task_priority = models.CharField(max_length=15, choices=PRIORITY_CHOICES, default='LOW')
    task_desc = models.CharField(max_length=255)
    status = models.CharField(max_length=10, choices=STATUS_CHOICES, default='Todo')
    created_at = models.DateTimeField(auto_now_add=True)
    
    def __str__(self):
        return self.task_name
