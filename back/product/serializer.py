from rest_framework.serializers import ModelSerializer 
from .models import Product, ProductData, ProductImages

class productSerializer(ModelSerializer):
    class Meta:
        model = Product
        fields = '__all__'
