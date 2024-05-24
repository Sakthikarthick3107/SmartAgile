from django.db import models

# Create your models here.
from Organization.models import Organization
from Users.models import UserProfile

class Project(models.Model):
    STATUS_CHOICES = (
        ('PL', 'Planned'),
        ('IP', 'In Progress'),
        ('OH', 'On Hold'),
        ('CO', 'Completed'),
        ('CA', 'Cancelled'),
    )
    
    organization = models.ForeignKey(Organization, related_name='organization_projects', on_delete=models.CASCADE)
    proj_id = models.AutoField(primary_key=True)
    icon = models.ImageField(upload_to='project-icons/',blank=True , null=True)
    proj_name = models.CharField(max_length=100, unique=True)
    proj_deadline = models.CharField(max_length=10)
    proj_desc = models.CharField(max_length=255)
    status = models.CharField(max_length=2 , choices= STATUS_CHOICES , default='PL')
    created_at = models.DateField(auto_now_add=True)
    
    def __str__(self):
        return self.proj_name
    
class ProjectMembers(models.Model):
    project = models.ForeignKey(Project, on_delete=models.CASCADE , related_name='proj_members')
    profile = models.ForeignKey(UserProfile , on_delete=models.CASCADE , related_name='project_membership')
    role_within_project = models.CharField(max_length=100)
    
    def __str__(self):
        return f"{self.profile.user.username}"