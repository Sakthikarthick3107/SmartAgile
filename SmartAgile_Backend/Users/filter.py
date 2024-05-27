import django_filters
from .models import UserProfile

class UserProfileFilter(django_filters.FilterSet):
    username  = django_filters.CharFilter(field_name='user__username' , lookup_expr='icontains')
    organization = django_filters.CharFilter(field_name='organization__org_id', lookup_expr='exact')
    class Meta:
        model = UserProfile
        fields = ['username','organization']