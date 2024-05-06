from django.urls import path
from .views import ProjectView , status_choices

urlpatterns = [
    path('', ProjectView.as_view(), name='Project Created'),
    path('status-choices/' , status_choices , name="Status Choices"),
    #path('<int:proj_id>', ProjectView.as_view(), name='Projects Details'),
    path('organization/<int:organization>', ProjectView.as_view(), name='Projects Details')
]
