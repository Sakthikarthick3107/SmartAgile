from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.views import APIView
from .models import Organization
from .serializers import OrganizationSerializer
from rest_framework import status
from drf_spectacular.utils import extend_schema

# Create your views here.
@extend_schema(request=OrganizationSerializer , responses= OrganizationSerializer)
class OrganizationView(APIView):
    def get(self,request,org_id=None):
        if org_id is not None:
            try:
                organization_id = Organization.objects.get(org_id=org_id)
                new_serializer = OrganizationSerializer(organization_id)
                return Response(new_serializer.data)
            except Organization.DoesNotExist:
                return Response({'error':'Invalid Credentials'},status=status.HTTP_404_NOT_FOUND)
        organization=Organization.objects.all()
        serialized=OrganizationSerializer(organization,many=True)
        return Response(serialized.data)
    
    def post(self,request):
        new_organization = OrganizationSerializer(data=request.data)
        if new_organization.is_valid():
            new_organization.save()
            return Response({
                'message' : 'successfully created',
                'data' : new_organization.data
            })
        
        return Response(new_organization.errors)
    
    def put(self,request,org_id):
        organization_update = Organization.objects.get(org_id=org_id)
        new_update = OrganizationSerializer(organization_update,data=request.data)
        if new_update.is_valid():
            new_update.save()
            return Response({
                'message':'Successfully updated',
                'data':new_update.data
            })
        
        return Response(new_update.errors)
    
    def delete(self,request,org_id):
        organization_delete = Organization.objects.get(org_id=org_id)
        try:
            organization_delete.delete()
            return Response({'message':'Successfully deleted'})
        except Organization.DoesNotExist:
                return Response({'error':'Employee not found'},status=status.HTTP_404_NOT_FOUND)