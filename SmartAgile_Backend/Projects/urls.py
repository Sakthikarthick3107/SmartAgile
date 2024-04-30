from django.urls import path
from .views import ProjectView

urlpatterns = [
    path('', ProjectView.as_view(), name='Project Created'),
    path('<int:id>', ProjectView.as_view(), name='Projects Details')
]
