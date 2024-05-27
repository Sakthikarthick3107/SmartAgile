from django.urls import path 
from .views import OrganizationView


urlpatterns = [
    path('',OrganizationView.as_view(),name='organization_view'),
    path('<int:org_id>/',OrganizationView.as_view(),name='organization_view_id')
]