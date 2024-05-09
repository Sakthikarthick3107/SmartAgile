from django.urls import path
from .views import TaskView

urlpatterns = [
    path('', TaskView.as_view(), name='Task Created'),
    path('<int:task_id>', TaskView.as_view(), name='Task Details')
]
