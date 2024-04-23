from django.urls import path
from .views import (
    UsersView , 
    UserEditUpdateDeleteView, 
    LoginView,SuperuserCreate , 
    SuperuserViewEditDelete,
    UserProfileCreate,
    )
from .forgot_password_views import PasswordResetRequestView, PasswordResetConfirmOtpView, PasswordResetConfirmView

# from .views import MyTokenObtainPairView

# from rest_framework_simplejwt.views import TokenRefreshView

urlpatterns = [
    path('employees/', UsersView.as_view(), name='Users'),
    path('employees/<int:id>' ,UserEditUpdateDeleteView.as_view() , name="User Edits" ),
    path('login/', LoginView.as_view(), name='login'),
    path('employees/superuser/',SuperuserCreate.as_view(),name='superuser-create'),
    path('employees/superuser/<int:id>', SuperuserViewEditDelete.as_view() , name="SuperUserViewEditDelete"),
    

    path('employee/profile' , UserProfileCreate.as_view() , name="User-Profile Create"),
    path('employee/profile/<int:id>' , UserProfileCreate.as_view() , name="User-Profile Create id"),

    path('employee/profile' , UserProfileCreate.as_view() , name="User-Profile Created"),


    path('auth/password_reset/', PasswordResetRequestView.as_view(), name='password-reset-request'),
    path('auth/password/reset/confirm/otp/<int:pk>/<str:code>/', PasswordResetConfirmOtpView.as_view(), name='password-reset-otp'),
    path('auth/password_reset/confirm/password/<int:pk>/<str:code>/', PasswordResetConfirmView.as_view(), name='password-reset-confirm'),

    # path('token/', MyTokenObtainPairView.as_view(), name='token-obtain-pair'),
    # path('token/refresh/', TokenRefreshView.as_view(), name='token-refresh-view'),
]
