from django.urls import path
from .views import UsersView , UserEditUpdateDeleteView, LoginView,SuperuserView

# from .views import MyTokenObtainPairView

# from rest_framework_simplejwt.views import TokenRefreshView

urlpatterns = [
    path('employees/', UsersView.as_view(), name='Users'),
    path('employees/<int:id>' ,UserEditUpdateDeleteView.as_view() , name="User Edits" ),
    path('login/', LoginView.as_view(), name='login'),
    path('superuser/',SuperuserView.as_view(),name='superuser-create')
    # path('token/', MyTokenObtainPairView.as_view(), name='token-obtain-pair'),
    # path('token/refresh/', TokenRefreshView.as_view(), name='token-refresh-view'),
]
