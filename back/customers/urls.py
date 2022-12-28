from django.urls import path 
from .views import index, emailVerification, otpVerification
urlpatterns = [
    path('', index, name='home'),
    path('email/', emailVerification.as_view(), name='emailVerify'),
    path('otpVerification/', otpVerification.as_view(), name='VerifyOTP'),

]
