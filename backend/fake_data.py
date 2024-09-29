import os
import django
from decimal import Decimal
from django.core.files.base import ContentFile
from io import BytesIO

# Assuming you're running this as a standalone script
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'backend.settings')  # Replace 'your_project' with your actual project name
django.setup()

from accounts.models import User
from products.models import Product
from categories.models import Category# Replace 'your_app' with your app name

# Get the user to assign as the owner of the products
owner_email = 'abdeljalilouafi55@gmail.com'
try:
    owner = User.objects.get(email=owner_email)
except User.DoesNotExist:
    print(f"User with email {owner_email} does not exist.")
    exit()

# Create categories and subcategories
categories_data = {
    "Furniture": ["Sofas", "Tables", "Chairs"],
    "Home Decor": ["Mirrors", "Wall Art", "Candles"],
    "Outdoor": ["Planters", "Garden Furniture", "Outdoor Lighting"],
    "Textiles": ["Rugs", "Cushions", "Curtains"],
    "Storage": ["Shelves", "Boxes", "Baskets"]
}

products_data = [
    {"title": "Luxe Leather Sofa", "description": "A spacious, comfortable leather sofa in a rich brown color.", "price": 950, "subcategory": "Sofas"},
    {"title": "Rustic Wooden Dining Table", "description": "Handcrafted dining table made from reclaimed wood, perfect for any modern farmhouse.", "price": 520, "subcategory": "Tables"},
    {"title": "Vintage Armchair", "description": "A retro armchair with plush fabric upholstery, ideal for a cozy reading nook.", "price": 270, "subcategory": "Chairs"},
    {"title": "Antique Gold Framed Mirror", "description": "A decorative mirror with an intricately carved gold frame, perfect for adding elegance to any room.", "price": 150, "subcategory": "Mirrors"},
    {"title": "Abstract Canvas Painting", "description": "A vibrant, large-scale canvas painting that brings life to any wall.", "price": 220, "subcategory": "Wall Art"},
    {"title": "Hand-Poured Soy Candles (Set of 3)", "description": "A set of three scented soy candles with calming lavender and vanilla fragrances.", "price": 35, "subcategory": "Candles"},
    {"title": "Ceramic Hanging Planters", "description": "Stylish hanging planters perfect for indoor and outdoor plants.", "price": 45, "subcategory": "Planters"},
    {"title": "Teak Outdoor Bench", "description": "A durable and weather-resistant teak bench for outdoor seating.", "price": 180, "subcategory": "Garden Furniture"},
    {"title": "Solar-Powered Garden Lights", "description": "A set of solar-powered lights to brighten up pathways or garden beds.", "price": 70, "subcategory": "Outdoor Lighting"},
    {"title": "Handwoven Jute Rug", "description": "A natural, eco-friendly jute rug with a minimalist design.", "price": 130, "subcategory": "Rugs"},
    {"title": "Velvet Throw Pillows (Set of 4)", "description": "Luxurious velvet cushions in deep jewel tones.", "price": 50, "subcategory": "Cushions"},
    {"title": "Linen Sheer Curtains", "description": "Light, airy curtains made from soft linen fabric, perfect for letting in natural light.", "price": 85, "subcategory": "Curtains"},
    {"title": "Industrial Metal Wall Shelf", "description": "A minimalist, industrial-style wall shelf made from matte black metal.", "price": 75, "subcategory": "Shelves"},
    {"title": "Set of 3 Wooden Storage Boxes", "description": "Elegant wooden boxes for organizing anything from trinkets to office supplies.", "price": 60, "subcategory": "Boxes"},
    {"title": "Woven Storage Baskets (Set of 2)", "description": "Handcrafted baskets made from natural fibers, perfect for stylish storage.", "price": 40, "subcategory": "Baskets"},
]

# Create or get categories and subcategories
category_objects = {}

for category_name, subcategories in categories_data.items():
    # Create parent category
    category, created = Category.objects.get_or_create(name=category_name, parent=None)
    for subcategory_name in subcategories:
        subcategory, created = Category.objects.get_or_create(name=subcategory_name, parent=category)
        category_objects[subcategory_name] = subcategory

# Create the fake products and assign to categories
for product_data in products_data:
    subcategory = category_objects.get(product_data['subcategory'])
    if subcategory:
        product = Product(
            title=product_data['title'],
            description=product_data['description'],
            price=Decimal(product_data['price']),
            category=subcategory,
            owner=owner
        )
        product.save()
        print(f"Created product: {product.title}")
    else:
        print(f"Subcategory {product_data['subcategory']} not found!")

print("Fake products have been created successfully!")

