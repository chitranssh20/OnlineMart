from django.urls import path 
from .views import savePromoCode, getPromoCode, updateCode, deleteCode
urlpatterns = [
    path('savePromoCode/', savePromoCode.as_view(), name='savePromoCode'),
    path('getPromoCode/', getPromoCode.as_view(), name='getPromoCode'),
    path('updateCode/<int:id>', updateCode.as_view(), name='updateCode'),
    path('deleteCode/<int:id>', deleteCode.as_view(), name='deleteCode'),
]
