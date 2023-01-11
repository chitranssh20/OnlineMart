from django.urls import path 
from django.conf import settings 
from django.conf.urls.static import static
from .views import addProduct, getAllProducts , getSingleProduct, updateProduct, updateBrand, getBrands, deleteProduct, deleteBrand
urlpatterns = [
    path('addProduct/', addProduct.as_view(), name='addProduct'),
    path('getAllProducts/', getAllProducts.as_view(), name='getAllProducts'),
    path('getSingleProduct/<int:id>', getSingleProduct.as_view(), name='getSingleProduct'),
    path('updateProduct/<int:id>', updateProduct.as_view(), name='updateProduct'),
    path('updateBrand/', updateBrand.as_view(), name= 'updateBrand'),
    path('getBrands/', getBrands.as_view(), name= 'getBrands'),
    path('deleteProduct/<int:id>', deleteProduct.as_view(), name= 'deleteProduct'),
    path('deleteBrand/<int:id>', deleteBrand.as_view(), name= 'deleteBrand')
]+ static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)

