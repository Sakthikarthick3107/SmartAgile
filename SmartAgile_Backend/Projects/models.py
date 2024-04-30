from django.db import models

# Create your models here.
from Organization.models import Organization

class Project(models.Model):
    organization = models.ForeignKey(Organization, related_name='organization_projects', on_delete=models.CASCADE)
    proj_id = models.AutoField(primary_key=True)
    proj_name = models.CharField(max_length=100, unique=True)
    proj_deadline = models.CharField(max_length=10)
    proj_desc = models.CharField(max_length=255)
