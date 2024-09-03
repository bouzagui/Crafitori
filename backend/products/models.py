from django.db import models

# Create your models here.
from decimal import Decimal
from categories.models import Category
from accounts.models import User


class Product(models.Model):
    title = models.CharField(max_length=120)
    description = models.TextField(blank=True, null=True)
    price = models.DecimalField(max_digits=15, decimal_places=2)
    category = models.ForeignKey(Category, related_name='products', on_delete=models.CASCADE)
    owner = models.ForeignKey(User, related_name='products', on_delete=models.CASCADE)

    @property
    def sale_price(self):
        return "%.2f" %(float(self.price  * Decimal('0.8')))

    def __str__(self):
        return f"{self.title}"
