from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status 
from .models import Product, ProductData, ProductImages
from .serializer import productSerializer


# Utility Functions 

def checkProductDataexists(name):
    checkProductData = ProductData.objects.filter(product_name = name).exists()
    return checkProductData

class getProducts(APIView):
    def get(self, request):
        if request.method == 'GET':
            products = Product.objects.all()
            serializer = productSerializer(products, many= True) 
            
            return Response({'message': serializer.data, 'status': status.HTTP_200_OK})


class addProduct(APIView):
    def post(self, request):
        if request.method == 'POST':
            name = request.POST.get('product_name')
            description = request.POST.get('description')
            retail_price = request.POST.get('retail_price')
            discounted_price = request.POST.get('discounted_price')
            brand = request.POST.get('brand')
            imgF = request.FILES['img']
            if name is None or description is None or retail_price is None or discounted_price is None or brand is None :
                return Response({'message': 'Missing credentials', 'status': status.HTTP_400_BAD_REQUEST})

            else:
                if not checkProductDataexists(name):
                    productData = ProductData(product_name = name, brand = brand)
                    productData.save()
                    prodId = ProductData.objects.get(product_name = name)
                    product = Product.objects.create(product_name = prodId , retail_price = retail_price, discounted_price = discounted_price, description = description)

                    imgId = Product.objects.get(pk = product.pk)
                    images = ProductImages.objects.create(firstImage = imgF, secondImage = imgF, thirdImage = imgF, uniqId = imgId)
                    


                else:
                    prodId = ProductData.objects.get(product_name = name)
                    product = Product.objects.create(product_name = prodId , retail_price = retail_price, discounted_price = discounted_price, description = description)

                    # Use product.pk to get primary key of just added product and use it to save images. 
                    
                    imgId = Product.objects.get(pk = product.pk)
                    images = ProductImages.objects.create(firstImage = imgF, secondImage = imgF, thirdImage = imgF, uniqId = imgId)
                return Response({'message': 'Product Added', 'status': status.HTTP_201_CREATED})
        return None