from django.urls import path
from .views import RegisterView,LoginView

urlpatterns = [
    path('employee_register/', RegisterView.as_view(), name='register'),
    path('login/', LoginView.as_view(), name='login')
]
