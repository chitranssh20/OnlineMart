from django.urls import path 
from .views import index, emailVerification, otpVerification, resendOTP, Blacklist

from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)

urlpatterns = [
    path('', index, name='home'),
    path('email/', emailVerification.as_view(), name='emailVerify'),
    path('otpVerification/', otpVerification.as_view(), name='VerifyOTP'),
   path('resendOTP/', resendOTP.as_view(), name='resendOTP'),
path('api/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('logout/blacklist/', Blacklist.as_view(), name="Blacklist"),
]
