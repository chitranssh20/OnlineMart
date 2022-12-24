from django.db import models

# Create your models here.
class Order(models.Model):
    orderId = models.AutoField(primary_key=True)
    email = models.EmailField()
    fname = models.CharField(max_length=50)
    lname = models.CharField(max_length=50)
    phone = models.IntegerField()
    street = models.CharField(max_length=200)
    cart= models.JSONField()
    date = models.DateField(auto_now_add=True)
    pincode = models.ForeignKey('customers.Address', on_delete=models.PROTECT)
    promocode = models.CharField(max_length=50)
    total = models.IntegerField()
    delievered = models.BooleanField(default=False)