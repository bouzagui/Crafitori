from django.urls import path
from . import views
from categories.views import ProductBySubcategoryView

urlpatterns = [
    path('<int:pk>/', views.ProductMixing.as_view(), name="retrieve-product"),
    path('<int:pk>/update/', views.ProductUpdateAPIView.as_view(), name="update-product"),
    path('<int:pk>/delete/', views.ProductMixing.as_view(), name="delete-product"),
    path('', views.ProductMixing.as_view(), name="list-create-product"),
    path('subcategory/<int:subcategory_id>/', ProductBySubcategoryView.as_view(), name='products-by-subcategory'),
    path('search/', views.ProductSearchView.as_view(), name='product-search'),
]

