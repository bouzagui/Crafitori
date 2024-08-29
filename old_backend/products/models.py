from django.db import models

# Create your models here.
from decimal import Decimal


class Product(models.Model):
    title = models.CharField(max_length=120)
    description = models.TextField(blank=True, null=True)
    price = models.DecimalField(max_digits=15, decimal_places=2)

    @property
    def sale_price(self):
        return "%.2f" %(float(self.price  * Decimal('0.8')))

    def get_discount(self):
        return "222"

    def __str__(self):
        return f"{self.title}"
