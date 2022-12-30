from time import sleep
import random
import django
django.setup()
from .models import Visitor
def resetOTP(email, defaultOTP):
    differentiator = random.randrange(10,1000,1)
    defaultOTP -= differentiator
    sleep(900)
    visitor = Visitor.objects.get(email = email)
    visitor.otp = defaultOTP 
    visitor.save()