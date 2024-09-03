from django.urls import path
from .views import CategoryListCreateView, SubcategoryCreateView, DeleteCategoryView

urlpatterns = [
    path('', CategoryListCreateView.as_view(), name='category-list-create'),
    path('subcategory/create/', SubcategoryCreateView.as_view(), name='create-subcategory'),
    path('delete/<int:pk>/', DeleteCategoryView.as_view(), name="delete-category")
]
