from django.contrib import admin
from .models import Task
from django import forms
from Projects.models import ProjectMembers

class TaskAdminForm(forms.ModelForm):
    class Meta:
        model = Task
        fields = '__all__'

    def __init__(self, *args, **kwargs):
        super(TaskAdminForm, self).__init__(*args, **kwargs)
        if self.instance and hasattr(self.instance, 'project'):
            if self.instance.project:
                self.fields['assigned_to'].queryset = ProjectMembers.objects.filter(project=self.instance.project)

class TaskAdmin(admin.ModelAdmin):
    form = TaskAdminForm
    list_display = ['task_id', 'task_name' , 'assigned_to', 'project', 'assigned_by' ]
    list_filter = ['project']

admin.site.register(Task, TaskAdmin)
