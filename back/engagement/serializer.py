from rest_framework.serializers import ModelSerializer 
from .models import PromoCode 

class getCodeSerializer(ModelSerializer):
    class Meta:
        model = PromoCode 
        fields = '__all__'