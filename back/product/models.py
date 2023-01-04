from django.db import models
from django.contrib.postgres.fields import ArrayField

# Create your models here.
class Product(models.Model):
    uniqId = models.AutoField(primary_key=True)
    product_name = models.ForeignKey('ProductData', on_delete=models.CASCADE)
    retail_price = models.IntegerField()
    discounted_price = models.IntegerField()
    description = models.CharField(max_length=10000)
    rating = models.FloatField()

class ProductData(models.Model):
    prodId = models.AutoField(primary_key=True)
    product_name = models.CharField(max_length=200, unique=True)
    brand = models.CharField(max_length=100)

class ProductImages(models.Model):
    productImage = models.ImageField(upload_to='media')
    uniqId = models.ForeignKey('Product', on_delete=models.CASCADE)

