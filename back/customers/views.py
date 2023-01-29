from django.shortcuts import render, HttpResponse
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status 
from django.core.mail import send_mail
from .models import Visitor, Customer
import random
from multiprocessing import Process
from .asyncfunctions import resetOTP
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.permissions import IsAdminUser, IsAuthenticated

# Create your views here.
def index(self):
    return HttpResponse('hello')

otpStartRange = 1200 
otpEndRange = 9500
otpStepRange = 1 
defaultOTP = otpEndRange*7

# Developer guide for registration 
# If otp matches then create a customer and register the user.
# If email request comes from the client then isCustomer function will tell if it is registered and "Already Registered will be returned" and if email is not registered then if the email is already in visitor database then it will be deleted and recreated just to make the process easy



# Function to generate OTP
def generateOTP():
    otp = int(random.randrange(otpStartRange, otpEndRange, otpStepRange))
    return otp


# Function to send emails
def sendEmail(email, otp):
    send_mail('Welcome to Online Mart', 'Welcome to Online Mart. Please Enter this otp to verify your email address.\nOTP: '+str(otp),'ecomweb2022@outlook.com', [email], fail_silently=False)

def isCustomer(email):
    doesCustomerExist = Customer.objects.filter(email = email).exists()
    if not doesCustomerExist:
        return {'status': status.HTTP_404_NOT_FOUND}
    else:
        return {'status': status.HTTP_302_FOUND}

# Function to handle Email in Visitor Database
def isAlreadyInVisitor(email):
    doesVisitorExist = Visitor.objects.filter(email = email).exists()
    if doesVisitorExist:
        Visitor.objects.filter(email = email).delete()
        
class emailVerification(APIView):
    def post(self,request):
        checkEmail = request.POST.get('email')
        checkPassword = request.POST.get('password')

        # Check if email and password are given
        if checkEmail is None or checkPassword is None:
            return Response({'message': 'Missing Credentials', 'status': status.HTTP_400_BAD_REQUEST})

        # Check if email is already registered
        if isCustomer(checkEmail)['status'] == 302:
            return Response({"message": "Customer Already Registered", 'status': status.HTTP_208_ALREADY_REPORTED})
        else:
            email = checkEmail
            password = checkPassword 
            otp = generateOTP()
            print('otp', otp)

            isAlreadyInVisitor(email)

            visitor = Visitor.objects.create_visitor(email, password, otp)
            # send_mail('Welcome to Online Mart', 'Welcome to Online Mart. Please Enter this otp to verify your email address.\nOTP: '+str(otp),'ecomweb2022@outlook.com', [email], 
            # fail_silently=False)
            # sendEmail(email, otp)
            return Response({'message': 'Please Verify the OTP', 'status': status.HTTP_403_FORBIDDEN})

class otpVerification(APIView):
    def post(self, request):
        email = request.POST.get('email')
        password = request.POST.get('password')
        fname = request.POST.get('fname')
        lname = request.POST.get('lname')
        phone = request.POST.get('phone')
        otp = request.POST.get('otp')
        otp = int(otp)

        if email is None or otp is None or password is None or fname is None or lname is None or phone is None:
            return Response({'message' :'Missing credentials', 'status': status.HTTP_400_BAD_REQUEST}) 

        # Check if already registered
        if isCustomer(email)['status'] == 302:
            return Response({"message": "Customer Already Registered", 'status': status.HTTP_208_ALREADY_REPORTED})
        
        doesVisitorEmailExist = Visitor.objects.filter(email = email).exists()
        if not doesVisitorEmailExist:
            return Response({'message': 'Please Sign Up', 'status': status.HTTP_400_BAD_REQUEST})
        visitor = Visitor.objects.get(email = email)
        visitorOTP = visitor.otp
        if otp == visitorOTP:
            customer = Customer.objects.create_customer(email, password, fname, lname, phone)
            return Response({'message': 'OTP Verified', 'status': status.HTTP_201_CREATED})
        
        # Resetting OTP
        # task = asyncio.create_task(resetOTP(email))
        p = Process(target=resetOTP, args=(email,defaultOTP,))
        p.start()
        
        return Response({'message': 'Wrong OTP', 'status': status.HTTP_401_UNAUTHORIZED})
       

class resendOTP(APIView):
    def post(self, request):
        email = request.POST.get('email')
        if email is None:
            return Response({'message': 'No Email Provided', 'status': status.HTTP_401_UNAUTHORIZED})
        
        otp = generateOTP()
        visitor = Visitor.objects.get(email = email)
        visitor.otp = otp
        visitor.save()
        # sendEmail(email, otp)
        return Response({'message': 'New OTP has been sent. Please Verify', 'status': status.HTTP_401_UNAUTHORIZED })
            
        
            # return Response(5+5)

#     Black List Tokens
class Blacklist(APIView):
    def post(self, request):
        try:
            refresh_token = request.data["refresh_token"]
            token = RefreshToken(refresh_token)
            token.blacklist()
            return Response("Succesfull")
        except Exception as e:
            return Response(status.HTTP_400_BAD_REQUEST)

# Check if the user is admin to decide whether to redireect for security
class checkAdmin(APIView):
    # permission_classes = [IsAdminUser]
    def get(self, request):
        data = request.headers
        print(5+5)
        print(data)
        return Response({'rescode': status.HTTP_202_ACCEPTED})

