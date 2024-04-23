from django.db import models
from django.contrib.auth.models import User, AbstractUser
from Organization.models import Organization
# Create your models here.

class UserProfile(models.Model):
    user = models.OneToOneField(User , on_delete=models.CASCADE , related_name='profile')
    organization = models.ForeignKey(Organization , on_delete=models.CASCADE)
    def __str__(self):
        return f"{self.user.username}  {self.organization.org_name}"
    
class User(AbstractUser):
    otp = models.CharField(max_length=6, blank=True, null=True)
    groups = models.ManyToManyField(
        'auth.Group',
        related_name='custom_users',  # Unique related name
        blank=True,
        help_text='The groups this user belongs to. A user can belong to multiple groups.'
    )
    user_permissions = models.ManyToManyField(
        'auth.Permission',
        related_name='custom_users',  # Unique related name
        blank=True,
        help_text='Specific permissions for this user.'
    )