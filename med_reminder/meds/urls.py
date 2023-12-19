from django.urls import path, include
from rest_framework.routers import DefaultRouter

from .views import MedicineListView, AllMedicineListView, AddMedicine, DeleteMedicine

router = DefaultRouter()
router.register('medicine-list', AllMedicineListView, basename='Medicine List'),
router.register('user-medicine-list', MedicineListView, basename='User Medicine List'),


urlpatterns = [
    path('',include(router.urls)),   
    # path('add/', add_medicine, name='add'),
    path('add/',AddMedicine.as_view()),
    path('delete/<int:pk>/', DeleteMedicine.as_view()),
    # path('add/',AddMedicine.as_view()),
    # path('get/',AllMedicineListView.as_view()),
]   