from django.db import models
from django.utils import timezone
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager

# Create your models here.
class VisitorManager(BaseUserManager):
    def create_visitor(self, email, password, otp):
        if not email:
            raise ValueError('Email must be provided')
        if not password:
            raise ValueError('Password must be provided')
        if not otp:
            raise ValueError('OTP must be provided')
        email = self.normalize_email(email)
        user = self.model(email = email)
        user.set_password(password)
        user.last_login = timezone.now()
        user.otp = otp
        user.save()

        return user 
    
class CustomerManager(BaseUserManager):
    def create_customer(self, email, password, fname, lname, phone):
        if not email:
            raise ValueError('Email must be provided')
        if not password:
            raise ValueError('Password must be provided')
        if not fname:
            raise ValueError('First Name must be provided')
        if not lname:
            raise ValueError('Last Name must be provided')
        if not phone:
            raise ValueError('Phone must be provided')

        email = self.normalize_email(email)
        customer = self.model(email = email, fname = fname, lname = lname, phone = phone)
        customer.set_password(password)
        customer.last_login = timezone.now()
        customer.save()

        return customer 
    
    def create_staff(self, email, password, fname, lname, phone):
        staff = self.create_customer(email, password, fname, lname, phone)
        staff.is_staff = True

        if staff.is_staff is not True:
            raise ValueError('is_staff must be true')
        
        return staff 
    def create_superuser(self, email, password, fname, lname, phone):
        superuser = self.create_staff(email, password, fname, lname, phone)
        superuser.is_superuser = True

        if superuser.is_superuser is not True:
            raise ValueError('isSuperuser must be True')

        return superuser

        


# User who has not made any purchase
class Visitor(AbstractBaseUser):
    email = models.EmailField(primary_key=True)
    otp = models.IntegerField()

    USERNAME_FIELDS = 'email'
    REQUIRED_FIELDS = []
    objects = VisitorManager()

class Customer(AbstractBaseUser):
    email = models.EmailField(primary_key=True)
    fname = models.CharField(max_length=50)
    lname = models.CharField(max_length=50)
    phone = models.CharField(max_length=15)
    newsletter = models.BooleanField(default=False)
    street = models.CharField(max_length=200)
    pincode = models.ForeignKey('Address', on_delete=models.PROTECT, null=True)
    is_staff = models.BooleanField(default=False)
    is_superuser = models.BooleanField(default = False)
    is_active = models.BooleanField(default=True)

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['fname', 'lname', 'phone']


    objects = CustomerManager()


class Address(models.Model):
    pincode  = models.IntegerField(primary_key=True)
    district = models.CharField(max_length=100)
    city = models.CharField(max_length=50)
    state = models.CharField(max_length=50)
    country = models.CharField(max_length=100, default='India')

    USERNAME_FIELDS = 'pincode'
    REQUIRED_FIELDS = ['district', 'city', 'state']

