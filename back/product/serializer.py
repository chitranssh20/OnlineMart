from rest_framework.serializers import ModelSerializer 
from .models import Product, ProductData, ProductImages

class productSerializer(ModelSerializer):
    class Meta:
        model = Product
        fields = '__all__'
class productDataSerializer(ModelSerializer):
    class Meta:
        model = ProductData
        fields = '__all__'
class productImgSerializer(ModelSerializer):
    class Meta:
        model = ProductImages
        fields = '__all__'
