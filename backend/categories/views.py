from django.shortcuts import render

from rest_framework import generics
from .models import Category
from .serializers import CategorySerializer
from products.serializers import ProductSerializer
from products.models import Product
from rest_framework.permissions import IsAdminUser
from rest_framework.parsers import MultiPartParser, JSONParser
from rest_framework.response import Response
from rest_framework import serializers

# Please use form-data for this endpoint instead of application/json
# since it requires an image for the category
class CategoryListCreateView(generics.ListCreateAPIView):
    queryset = Category.objects.filter(parent__isnull=True)
    serializer_class = CategorySerializer
    parser_classes = (MultiPartParser, JSONParser)


class DeleteCategoryView(generics.DestroyAPIView):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer
    permission_classes = [IsAdminUser]

# Please use form-data for this endpoint as well
class SubcategoryCreateView(generics.CreateAPIView):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer
    parser_classes = (MultiPartParser, JSONParser)



    def perform_create(self, serializer):
        parent_id = self.request.data.get("parent")

        if parent_id:  # Check if parent_id was provided
            try:
                parent_id = int(parent_id)  # Convert to integer
                parent = Category.objects.get(id=parent_id)  # Fetch parent
            except ValueError:
                raise serializers.ValidationError({"parent": "Must be a valid integer."})
            except Category.DoesNotExist:
                raise serializers.ValidationError({"parent": "Category with this ID does not exist."})
            serializer.save(parent=parent)


class ProductBySubcategoryView(generics.ListAPIView):
    serializer_class = ProductSerializer

    def get_queryset(self):
        subcategory_id = self.kwargs['subcategory_id']
        return Product.objects.filter(category_id=subcategory_id)



class SubcategoryByCategoryView(generics.ListAPIView):
    serializer_class = CategorySerializer
    lookup_field = "parent_id"

    def get_queryset(self):
        parent_id = self.kwargs['parent_id']
        return Category.objects.filter(parent=parent_id)
