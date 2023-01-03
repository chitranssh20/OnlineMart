from django.db import models
from django.contrib.postgres.fields import ArrayField

# Create your models here.
class Product(models.Model):
    uniqId = models.AutoField(primary_key=True)
    product_name = models.ForeignKey('ProductData', on_delete=models.CASCADE)
    retail_price = models.IntegerField()
    discounted_price = models.IntegerField()
    image = ArrayField(models.CharField(max_length=1000))
    description = models.CharField(max_length=60000)
    rating = models.FloatField()

class ProductData(models.Model):
    prodId = models.AutoField(primary_key=True)
    product_name = models.CharField(max_length=200, unique=True)
    brand = models.CharField(max_length=100)


