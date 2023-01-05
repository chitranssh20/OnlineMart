from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status 
from .models import Product, ProductData, ProductImages


# Utility Functions 

def checkProductDataexists(name):
    checkProductData = ProductData.objects.filter(product_name = name).exists()
    return checkProductData




class addProduct(APIView):
    def post(self, request):
        if request.method == 'POST':
            name = request.POST.get('product_name')
            description = request.POST.get('description')
            retail_price = request.POST.get('retail_price')
            discounted_price = request.POST.get('discounted_price')
            brand = request.POST.get('brand')
            if name is None or description is None or retail_price is None or discounted_price is None or brand is None :
                return Response({'message': 'Missing credentials', 'status': status.HTTP_400_BAD_REQUEST})

            else:
                if not checkProductDataexists(name):
                    productData = ProductData(product_name = name, brand = brand)
                    productData.save()
                    prodId = ProductData.objects.get(product_name = name)
                    product = Product.objects.create(product_name = prodId , retail_price = retail_price, discounted_price = discounted_price, description = description)
                    



                else:
                    prodId = ProductData.objects.get(product_name = name)
                    product = Product.objects.create(product_name = prodId , retail_price = retail_price, discounted_price = discounted_price, description = description)

                    # Use product.pk to get primary key of just added product and use it to save images. 
                    
                return Response({'message': 'Product Added', 'status': status.HTTP_201_CREATED})
        return None