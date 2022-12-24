from django.db import models

# Create your models here.
class PromoCode(models.Model):
    promoId = models.AutoField(primary_key=True)
    code = models.CharField(max_length=50)
    discount = models.IntegerField() 

class Review(models.Model):
    commentId = models.AutoField(primary_key=True)
    uniqId = models.ForeignKey('product.Product', on_delete=models.CASCADE)
    email = models.ForeignKey('customers.Customer', on_delete=models.CASCADE)
    date = models.DateField(auto_now_add=True)
    comment = models.CharField(max_length=300)

