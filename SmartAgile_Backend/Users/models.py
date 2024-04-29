from django.db import models
from django.contrib.auth.models import AbstractBaseUser,PermissionsMixin,BaseUserManager

# Create your CustomUserManager here.
class CustomUserManager(BaseUserManager):
    def _create_user(self, email, password, username, **extra_fields):
        if not email:
            raise ValueError("Email must be provided")
        if not password:
            raise ValueError('Password is not provided')

        user = self.model(
            email = self.normalize_email(email),
            username = username,
            **extra_fields
        )

        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_user(self, email, password, username, **extra_fields):
        extra_fields.setdefault('is_staff',False)
        extra_fields.setdefault('is_active',True)
        extra_fields.setdefault('is_superuser',False)
        return self._create_user(email, password, username, **extra_fields)

    def create_superuser(self, email, password, username, **extra_fields):
        extra_fields.setdefault('is_staff',True)
        extra_fields.setdefault('is_active',True)
        extra_fields.setdefault('is_superuser',True)
        return self._create_user(email, password, username, **extra_fields)

# Create your User Model here.
class User(AbstractBaseUser,PermissionsMixin):
    # Abstractbaseuser has password, last_login, is_active by default

    email = models.EmailField(db_index=True, unique=True, max_length=254)
    first_name = models.CharField(max_length=240)
    last_name = models.CharField(max_length=255)
    mobile = models.CharField(max_length=50)
    address = models.CharField( max_length=250)
    username = models.CharField(max_length=255, blank=True, null=True)

    is_staff = models.BooleanField(default=False) # must needed, otherwise you won't be able to log into django-admin.
    is_active = models.BooleanField(default=True) # must needed, otherwise you won't be able to log into django-admin.
    is_superuser = models.BooleanField(default=False) # this field we inherit from PermissionsMixin.
    
    otp = models.CharField(max_length=6, blank=True, null=True)

    objects = CustomUserManager()

    USERNAME_FIELD = 'email'


from Organization.models import Organization

class UserProfile(models.Model):
    user = models.OneToOneField(User , on_delete=models.CASCADE , related_name='profile')
    organization = models.ForeignKey(Organization , on_delete=models.CASCADE)
    position = models.CharField(max_length=100, null=True)
    role = models.CharField(max_length=100, null=True)
    date_joined = models.CharField(max_length=20,null=True)
    def __str__(self):
        return f"{self.user.username}  {self.organization.org_name}"
