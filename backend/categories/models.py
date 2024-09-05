from django.db import models

class Category(models.Model):
    name = models.CharField(max_length=120)
    parent = models.ForeignKey(
        'self', on_delete=models.CASCADE, related_name='subcategories', blank=True, null=True)
    image = models.ImageField(upload_to='category_pics')

    def __str__(self):
        return self.name
