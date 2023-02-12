from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated, AllowAny
from .models import Product, ProductData, ProductImages
from .serializer import productSerializer, productDataSerializer, productImgSerializer
from rest_framework.permissions import IsAuthenticated, IsAdminUser

# Utility Functions 

def checkProductDataexists(name):
    checkProductData = ProductData.objects.filter(product_name = name).exists()
    return checkProductData


class getBrands(APIView):
    def get(self, request):
        if request.method == 'GET':
            brandObjects = ProductData.objects.all() 
            brands = productDataSerializer(brandObjects, many= True) 

            return Response({'data': brands.data, 'status': status.HTTP_200_OK})


class getAllProducts(APIView):
    permission_classes = [AllowAny]
    authentication_classes = []
    def get(self, request):
        if request.method == 'GET':
            products = Product.objects.all()
            prodserializer = productSerializer(products, many= True) 
            response = []
            for product in prodserializer.data:
                productInstance = {
                    "uniqId" : product['uniqId'],
                    "retail_price": product['retail_price'],
                    "discounted_price": product["discounted_price"],
                    "rating": product['rating'],
                    "description": product['description']
                }
                brandKey = product['product_name'] 
                brand = ProductData.objects.get(pk = brandKey)

                productInstance['product_name'] = brand.product_name
                productInstance['brand'] = brand.brand


                key = product['uniqId']
                checkprodImages = ProductImages.objects.filter(uniqId = key).exists()
                if checkprodImages:
                    prodImages = ProductImages.objects.get(uniqId = key)
                    prodImagesResponse = productImgSerializer(prodImages, many = False)
                    data = prodImagesResponse.data 
                    productInstance['firstImage'] = data['firstImage']
                    productInstance['secondImage'] = data['secondImage']
                    productInstance['thirdImage'] = data['thirdImage']

                
                response.append(productInstance)


            return Response({'data': response, 'status': status.HTTP_200_OK})


class getSingleProduct(APIView):
    def get(self, request, id):
        if request.method == 'GET':
            product = Product.objects.get(pk = id) 
            prodData = productSerializer(product) 
            brandKey = prodData.data['product_name']
            brand = ProductData.objects.get(pk = brandKey)
            SingleProductInstance = {}
            SingleProductInstance = {
                        "uniqId" : prodData.data['uniqId'],
                        "retail_price": prodData.data['retail_price'],
                        "discounted_price": prodData.data["discounted_price"],
                        "rating": prodData.data['rating'],
                        "description": prodData.data['description']
                    }
            SingleProductInstance['product_name'] = brand.product_name
            SingleProductInstance['brand'] = brand.brand
            checkprodImages = ProductImages.objects.filter(uniqId = id).exists()
            if checkprodImages:
                prodImages = ProductImages.objects.get(uniqId = id)
                prodImagesResponse = productImgSerializer(prodImages, many = False)
                data = prodImagesResponse.data 
                SingleProductInstance['firstImage'] = data['firstImage']
                SingleProductInstance['secondImage'] = data['secondImage']
                SingleProductInstance['thirdImage'] = data['thirdImage']


            return Response({'data': SingleProductInstance, 'status': status.HTTP_200_OK}) 
        return Response({'message': 'Please use get method', 'status': status.HTTP_400_BAD_REQUEST})

class addProduct(APIView):
    permission_classes = [IsAdminUser]
    def post(self, request):
        if request.method == 'POST':
            name = request.data['name']
            description = request.data['description']
            retail_price = request.data['retail_price']
            discounted_price = request.data['discounted_price']
            brand = request.data['brand']
            imgF = request.FILES['imgF']
            imgS = request.FILES['imgS']
            imgT = request.FILES['imgT']
            if not name or not description or not retail_price or not discounted_price or not brand or not imgF or not imgT or not imgS:
                return Response({'message': 'Missing credentials', 'status': status.HTTP_400_BAD_REQUEST})

            else:
                if not checkProductDataexists(name):
                    productData = ProductData(product_name = name, brand = brand)
                    productData.save()
                    prodId = ProductData.objects.get(product_name = name)
                    product = Product.objects.create(product_name = prodId , retail_price = retail_price, discounted_price = discounted_price, description = description)

                    imgId = Product.objects.get(pk = product.pk)
                    images = ProductImages.objects.create(firstImage = imgF, secondImage = imgS, thirdImage = imgT, uniqId = imgId)
                    


                else:
                    prodId = ProductData.objects.get(product_name = name)
                    product = Product.objects.create(product_name = prodId , retail_price = retail_price, discounted_price = discounted_price, description = description)

                    # Use product.pk to get primary key of just added product and use it to save images. 
                    
                    imgId = Product.objects.get(pk = product.pk)
                    images = ProductImages.objects.create(firstImage = imgF, secondImage = imgS, thirdImage = imgT, uniqId = imgId)
                return Response({'message': 'Product Added', 'status': status.HTTP_201_CREATED})
        return None

class updateProduct(APIView):
    def post(self, request, id):
        if request.method == 'POST':

            name = request.POST.get('product_name')
            description = request.POST.get('description')
            retail_price = request.POST.get('retail_price')
            discounted_price = request.POST.get('discounted_price')
            brand = request.POST.get('brand')
            imgF = request.FILES['imgF']
            imgS = request.FILES['imgS']
            imgT = request.FILES['imgT']


            if name is None or description is None or retail_price is None or discounted_price is None or brand is None :
                return Response({'message': 'Missing credentials', 'status': status.HTTP_400_BAD_REQUEST}) 
            
            else:
                if not checkProductDataexists(name):
                    productData = ProductData(product_name = name, brand = brand)
                    productData.save()
                    prodId = ProductData.objects.get(product_name = name)
                    product = Product.objects.get(pk = id)
                    product.product_name = prodId 
                    product.retail_price = retail_price
                    product.description = description 
                    product.discounted_price = discounted_price 
                    product.save()

                    imgId = ProductImages.objects.get(uniqId = product.pk) 
                    imgId.firstImage = imgF 
                    imgId.secondImage = imgS 
                    imgId.thirdImage = imgT 
                    imgId.save()

                else:
                    product = Product.objects.get(pk = id)
                    prodId = ProductData.objects.get(product_name = name)
                    product.product_name = prodId 
                    product.retail_price = retail_price
                    product.description = description 
                    product.discounted_price = discounted_price 
                    product.save()

                    imgId = ProductImages.objects.get(uniqId = product.pk) 
                    imgId.firstImage = imgF 
                    imgId.secondImage = imgS 
                    imgId.thirdImage = imgT 
                    imgId.save()

                return Response({'message': 'Product Updated', 'status': status.HTTP_200_OK})
        return Response({'waht the heck is gogn on'}) 

class updateBrand(APIView):
    def post(self, request):
        name = request.POST.get('name')
        brand = request.POST.get('brand')

        if name is None or brand is None:
            return Response({'message': 'Missing Credentials', 'status': status.HTTP_400_BAD_REQUEST}) 
        else:
            if not checkProductDataexists(name):
                return Response({'messgae': 'No Such Product Exists', 'status': status.HTTP_404_NOT_FOUND}) 
            else:
                brandData = ProductData.objects.get(product_name = name) 
                brandData.brand = brand 
                brandData.save() 

            
            return Response({'message': 'Brand Name Updated', 'status': status.HTTP_200_OK}) 
            

class deleteProduct(APIView):
    def delete(self, request, id):
        product = Product.objects.filter(uniqId = id).exists() 
        if not product:
            return Response({'message': 'Wrong Credentials', 'status': status.HTTP_400_BAD_REQUEST}) 
        
        else:
            prod = Product.objects.get(uniqId = id) 
            prod.delete() 
        
            return Response({'message': 'Product Delted', 'status': status.HTTP_301_MOVED_PERMANENTLY}) 
        
class deleteBrand(APIView):
    def delete(self, request, id):
        brandExist = ProductData.objects.filter(pk= id).exists() 
        if not brandExist:
            return Response({'message': 'Product does not exist', 'status': status.HTTP_404_NOT_FOUND}) 
        else:
            brand = ProductData.objects.get(pk = id)
            brand.delete()
            return Response({'message': 'Product has been Deleted', 'status': status.HTTP_301_MOVED_PERMANENTLY })
