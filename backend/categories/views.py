from django.shortcuts import render

from rest_framework import generics
from .models import Category
from .serializers import CategorySerializer
from products.serializers import ProductSerializer
from products.models import Product

class CategoryListCreateView(generics.ListCreateAPIView):
    queryset = Category.objects.filter(parent__isnull=True)
    serializer_class = CategorySerializer


class SubcategoryCreateView(generics.CreateAPIView):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer

    def perform_create(self, serializer):
        parent_id = self.request.data.get('parent_id')
        parent = Category.objects.get(id=parent_id)
        serializer.save(parent=parent)


class ProductBySubcategoryView(generics.ListAPIView):
    serializer_class = ProductSerializer

    def get_queryset(self):
        subcategory_id = self.kwargs['subcategory_id']
        return Product.objects.filter(category_id=subcategory_id)
