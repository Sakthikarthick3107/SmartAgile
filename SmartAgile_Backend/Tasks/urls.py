from django.urls import path
from .views import TaskView,Project_Task, UserTaskListView, UserTaskView, UserTaskLists, TaskStatusModifyView

urlpatterns = [
    path('', TaskView.as_view(), name='Task Created'),
    path('<int:task_id>/', TaskView.as_view(), name='Task Details'),
    path('project/<int:proj_id>/',Project_Task.as_view(),name='Project id'),
    path('project/<int:proj_id>/prior=<str:task_priority>/' , Project_Task.as_view() , name="Tasks on Priority"),
    path('project/user-tasks/<int:proj_id>/<int:id>/', UserTaskListView.as_view(), name='User Task List'),
    path('projects/user-task-data/<int:proj_id>/<int:user_id>/', UserTaskView.as_view(), name='User-Task_View'),
    path('projects/user-task/<int:user_id>/', UserTaskLists.as_view(), name='User-Task_View'),

    path('status-modify/<int:task_id>/', TaskStatusModifyView.as_view(), name='Task-status-modify')
]
