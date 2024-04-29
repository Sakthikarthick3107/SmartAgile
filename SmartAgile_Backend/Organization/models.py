from django.db import models
from Users.models import User

# Create your models here.
class Organization(models.Model):
    org_id = models.AutoField(primary_key=True)
    org_name = models.CharField(max_length=100)
    org_mail = models.EmailField(max_length=100)
    org_website = models.CharField(max_length=200)
    owner = models.ForeignKey(User,related_name='owned_organizations',on_delete=models.CASCADE)
    
    def __str__(self):
        return self.org_name