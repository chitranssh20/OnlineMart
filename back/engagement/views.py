from django.shortcuts import render
from .models import PromoCode
from rest_framework.views import APIView 
from rest_framework.response import Response 
from rest_framework import status 
from .serializer import getCodeSerializer
# Create your views here.

class savePromoCode(APIView):
    def post(self, request):
        if request.method == 'POST':
            code = request.POST.get('code')
            discount = request.POST.get('discount')

            if code is None or discount is None:
                return Response({'message': 'Missing Credentials', 'status': status.HTTP_400_BAD_REQUEST}) 
            else:
                PromoCode.objects.create(code = code, discount= discount) 
                return Response({'message': 'Promo Code added', 'status': status.HTTP_201_CREATED}) 

class getPromoCode(APIView):
    def get(self, request):
        if request.method == 'GET':
            codesStored = PromoCode.objects.all()  
            codes = getCodeSerializer(codesStored, many= True) 
            return Response({'codes': codes.data, 'status': status.HTTP_200_OK}) 

class updateCode(APIView):
    def post(self, request, id):
        if request.method == 'POST':
            codeExist = PromoCode.objects.filter(pk = id).exists()
            if not codeExist:
                return Response({'message': 'No Such Promo Code Exists', 'status': status.HTTP_404_NOT_FOUND}) 
            else:
                discount = request.POST.get('discount') 
                if discount is None:
                    return Response({'message': 'Wrong Credentials', 'status': status.HTTP_400_BAD_REQUEST}) 
                else:
                    code = PromoCode.objects.get(pk = id) 
                    code.discount = discount 
                    code.save() 
                    return Response({'message': 'Promo Code Updated', 'status': status.HTTP_200_OK})  

class deleteCode(APIView):
    def delete(self, request, id):
        codeExist = PromoCode.objects.filter(pk = id).exists()
        if not codeExist:
            return Response({'message': 'No Such Promo Code Exists', 'status': status.HTTP_404_NOT_FOUND})
        else:
            code = PromoCode.objects.get(pk = id)
            code.delete()
            return Response({'message': 'Promo Code Deleted', 'status': status.HTTP_200_OK})
