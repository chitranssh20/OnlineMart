from django.shortcuts import render
from .models import PromoCode, Review
from rest_framework.views import APIView 
from rest_framework.response import Response 
from rest_framework import status 
from .serializer import getCodeSerializer, getCommentSerializer
from product.models import  Product
from product.serializer import productSerializer
from customers.models import Customer
from customers.views import isCustomer
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

# Review APIs
class saveComment(APIView):
    def post(self, request):

        uniqId = request.POST.get('uniqId')
        email = request.POST.get('email')
        comment = request.POST.get('comment')
        parent = request.POST.get('parent')
        if not uniqId or not email or not comment:
            return Response('Missing Credentials')

        uniqId = request.data['uniqId']
        email = request.data['email']
        comment = request.data['comment']

        if not uniqId or not email or not comment:
            return Response('no data')
        id = int(uniqId)
        product = Product.objects.get(pk = id)
        print(Customer.objects.filter(email = email).exists())
        print('alkdjal', isCustomer(email))
        if not Customer.objects.filter(email = email).exists():
            return Response('Customer does not exists')
        customer = Customer.objects.get(email = email)
        response = productSerializer(product)
        if not parent:
            print('9999')
            comment = Review(uniqId = product, email = customer, comment = comment)
            comment.save()
            return Response({'response': 'Comment has been added'})
        else:
            parent = request.data['parent']
            parentComment = Review.objects.get(pk = parent)
            print('5454')
            comment = Review(uniqId = product, email = customer, comment = comment, parent = parentComment)
            comment.save()

        print(product)
        return Response({'data': response.data})

class deleteComment(APIView):
    def delete(self, request, id):
        if not id:
            return Response({'response': 'Please provide Comment Id', 'status': status.HTTP_400_BAD_REQUEST})
        if not Review.objects.filter(pk = id).exists():
            return Response({'response': 'Comment does not exists', 'status': status.HTTP_404_NOT_FOUND})

        else:
            comment = Review.objects.get(pk = id)
            comment.delete()
            return Response({'response': 'Comment has been deleted', 'status': status.HTTP_410_GONE})


class getComment(APIView):
    def get(self,request, id):
        if not id:
            return Response({'response': 'Please provide Comment Id', 'status': status.HTTP_400_BAD_REQUEST})

        commentsById = Review.objects.filter(uniqId = id, parent = None)
        comments  = getCommentSerializer(commentsById, many=True)
        return Response({'resposne': comments.data, 'status': status.HTTP_200_OK})

class getReply(APIView):
    def get(self, request, id):
        if not id:
            return Response({'response': 'Please provide Comment Id', 'status': status.HTTP_400_BAD_REQUEST})
        parentComment = Review.objects.filter(pk = id)
        repliesById = Review.objects.filter(parent = id)
        replies = getCommentSerializer(repliesById, many=True)
        return Response({'response': replies.data, 'status': status.HTTP_200_OK})





