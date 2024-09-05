# from django.contrib import admin
# from .models import Product, ProductImage


# admin.site.register(Product)
# admin.site.register(ProductImage)


from django.contrib import admin
from .models import Product, ProductImage

# Create an inline admin descriptor for ProductImage model
class ProductImageInline(admin.TabularInline):
    model = ProductImage
    extra = 1  # Number of empty forms to display for adding images
    fields = ['image']  # Specify fields to show

# Register the Product model with the ProductImage inline
@admin.register(Product)
class ProductAdmin(admin.ModelAdmin):
    list_display = ['title', 'owner', 'price', 'category']
    inlines = [ProductImageInline]  # Attach the ProductImage inline

# If you still want to see ProductImage separately in the admin panel:
@admin.register(ProductImage)
class ProductImageAdmin(admin.ModelAdmin):
    list_display = ['product', 'uploaded_at']
