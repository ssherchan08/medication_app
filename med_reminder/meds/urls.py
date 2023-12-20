from django.urls import path, include
from rest_framework.routers import DefaultRouter

from .views import MedicineListView, AllMedicineListView, AddMedicine, DeleteMedicine, EditRetreiveMedicine, FilteredByDay

router = DefaultRouter()
router.register('medicine-list', AllMedicineListView, basename='Medicine List'),
router.register('user-medicine-list', MedicineListView, basename='User Medicine List'),
router.register('filter-user-medicine', FilteredByDay, basename='Filter Medicine By Days'),


urlpatterns = [
    path('',include(router.urls)),   
    path('add/',AddMedicine.as_view()),
    path('delete/<int:pk>/', DeleteMedicine.as_view()),
    path('get-edit/<int:pk>/',EditRetreiveMedicine.as_view()),
]   