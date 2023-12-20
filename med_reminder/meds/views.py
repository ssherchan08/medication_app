from django.shortcuts import render
from django.http import JsonResponse
from rest_framework.views import APIView
from .serializers import MedicineSerializer
from .models import Medicine
from rest_framework.decorators import api_view

from rest_framework.viewsets import ModelViewSet
from django.http import Http404
from rest_framework.response import Response
from rest_framework import status, generics
from django_filters.rest_framework import DjangoFilterBackend

class MedicineListView(ModelViewSet):
    model = Medicine
    serializer_class = MedicineSerializer

    def get_queryset(self):
        user = self.request.user
        queryset = self.model.objects.filter(user=user)

        return queryset

class AllMedicineListView(ModelViewSet):
    model = Medicine
    serializer_class = MedicineSerializer

    def get_queryset(self):
        queryset = Medicine.objects.all()
        return queryset

class AddMedicine(APIView):
    
    serializer_class = MedicineSerializer
   
    def post(self, request, format=None):
        serializer = MedicineSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class DeleteMedicine(generics.DestroyAPIView):

    queryset = Medicine.objects.all()
    serializer_class = MedicineSerializer

class EditRetreiveMedicine(generics.RetrieveUpdateAPIView):
    
    queryset = Medicine.objects.all()
    serializer_class = MedicineSerializer    
    # def update(self, request, *args, **kwargs):
    #     data = request.DATA
    #     qs = Medicine.objects.filter(id=self.request.id)
    #     serializer = MedicineSerializer(qs, data=data, many=True)
        
    #     if serializer.is_valid():
    #         serializer.save()
    #         return Response(serializer.data, status=status.HTTP_201_CREATED)
    #     return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class FilteredByDay(ModelViewSet):
    queryset = Medicine.objects.all()
    serializer_class = MedicineSerializer
    filter_backends = [DjangoFilterBackend]
    filterset_fields = {
        'reminder_days': ["contains", "exact"],
        'user': ["exact"]
    }

