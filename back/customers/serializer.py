from rest_framework import serializers 
from .models import Visitor, Customer, Address 

class visitorSerializer(serializers.ModelSerializer):
    class Meta:
        model = Visitor 
        fields = '__all__' 
class customerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Customer
        fields = '__all__'

class addressSerializer(serializers.ModelSerializer):
    class Meta:
        model = Address 
        fields = '__all__'