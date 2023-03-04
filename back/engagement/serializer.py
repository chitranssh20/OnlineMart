from rest_framework.serializers import ModelSerializer 
from .models import PromoCode, Review

class getCodeSerializer(ModelSerializer):
    class Meta:
        model = PromoCode 
        fields = '__all__'

class getCommentSerializer(ModelSerializer):
    class Meta:
        model = Review
        fields = '__all__'