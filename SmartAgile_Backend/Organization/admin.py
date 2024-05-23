from django.contrib import admin
from .models import Organization

# Register your models here.

class OrganizationAdmin(admin.ModelAdmin):
    list_display = ['org_id', 'org_name', 'org_mail', 'owner']

admin.site.register(Organization, OrganizationAdmin)
