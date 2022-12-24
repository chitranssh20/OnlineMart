# Generated by Django 4.1.4 on 2022-12-22 17:34

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('customers', '0001_initial'),
        ('product', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='PromoCode',
            fields=[
                ('promoId', models.AutoField(primary_key=True, serialize=False)),
                ('code', models.CharField(max_length=50)),
                ('discount', models.IntegerField()),
            ],
        ),
        migrations.CreateModel(
            name='Review',
            fields=[
                ('commentId', models.AutoField(primary_key=True, serialize=False)),
                ('date', models.DateField(auto_now_add=True)),
                ('comment', models.CharField(max_length=300)),
                ('email', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='customers.customer')),
                ('uniqId', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='product.product')),
            ],
        ),
    ]