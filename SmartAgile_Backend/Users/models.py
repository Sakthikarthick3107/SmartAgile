from django.db import models
from django.contrib.auth.models import User
from Organization.models import Organization
# Create your models here.

class UserProfile(models.Model):
    user = models.OneToOneField(User , on_delete=models.CASCADE , related_name='profile')
    organization = models.ForeignKey(Organization , on_delete=models.CASCADE)
    def __str__(self):
        return f"{self.user.username}  {self.organization.org_name}"