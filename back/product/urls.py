from django.urls import path 
from django.conf import settings 
from django.conf.urls.static import static
from .views import addProduct, getProducts 
urlpatterns = [
    path('addProduct/', addProduct.as_view(), name='addProduct'),
    path('getProducts/', getProducts.as_view(), name='getProducts')
]+ static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)

