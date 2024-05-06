from django.contrib import admin
from .models import Project
# Register your models here.

class ProjectAdmin(admin.ModelAdmin):
    list_display = ['proj_id','proj_name' , 'proj_deadline' , 'proj_desc']
    list_filter = ['organization' , 'status']
admin.site.register(Project , ProjectAdmin)
