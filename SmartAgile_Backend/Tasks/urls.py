from django.urls import path
from .views import TaskView,Project_Task

urlpatterns = [
    path('', TaskView.as_view(), name='Task Created'),
    path('<int:task_id>', TaskView.as_view(), name='Task Details'),
    path('project/<int:proj_id>',Project_Task.as_view(),name='Project id'),
    path('project/<int:proj_id>/prior=<str:task_priority>' , Project_Task.as_view() , name="Tasks on Priority")
]
