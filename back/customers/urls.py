from django.urls import path 
from .views import index, emailVerification, otpVerification, resendOTP
urlpatterns = [
    path('', index, name='home'),
    path('email/', emailVerification.as_view(), name='emailVerify'),
    path('otpVerification/', otpVerification.as_view(), name='VerifyOTP'),
   path('resendOTP/', resendOTP.as_view(), name='resendOTP'),

]
