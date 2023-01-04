# Generated by Django 4.1.4 on 2023-01-04 12:48

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('product', '0002_alter_product_description'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='product',
            name='image',
        ),
        migrations.CreateModel(
            name='ProductImages',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('productImage', models.ImageField(upload_to='')),
                ('uniqId', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='product.product')),
            ],
        ),
    ]
