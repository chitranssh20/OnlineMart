from django.urls import path 
from django.conf import settings 
from django.conf.urls.static import static
from .views import addProduct
urlpatterns = [
    path('addProduct/', addProduct.as_view(), name='addProduct')
]+ static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)

