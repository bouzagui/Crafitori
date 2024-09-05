from django.shortcuts import render

from rest_framework import generics
from .models import Category
from .serializers import CategorySerializer
from products.serializers import ProductSerializer
from products.models import Product
from rest_framework.permissions import IsAdminUser
from rest_framework.parsers import MultiPartParser, FormParser


class CategoryListCreateView(generics.ListCreateAPIView):
    queryset = Category.objects.filter(parent__isnull=True)
    serializer_class = CategorySerializer
    parser_classes = (MultiPartParser, FormParser)


class DeleteCategoryView(generics.DestroyAPIView):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer
    permission_classes = [IsAdminUser]


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



class SubcategoryByCategoryView(generics.ListAPIView):
    serializer_class = CategorySerializer
    lookup_field = "parent_id"

    def get_queryset(self):
        parent_id = self.kwargs['parent_id']
        return Category.objects.filter(parent=parent_id)
