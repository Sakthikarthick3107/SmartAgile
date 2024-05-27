from django.contrib import admin
from .models import User
from .models import UserProfile

# Register your models here.
class UserAdmin(admin.ModelAdmin):
    list_display = ['id', 'username', 'email','is_staff', 'is_superuser']

class UserProfileAdmin(admin.ModelAdmin):
    list_display = ['user', 'organization', 'position', 'role']

admin.site.register(User, UserAdmin)
admin.site.register(UserProfile, UserProfileAdmin)