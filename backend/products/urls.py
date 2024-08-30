from django.urls import path
from . import views

urlpatterns = [
    path('<int:pk>/', views.ProductMixing.as_view()),
    path('<int:pk>/update/', views.ProductUpdateAPIView.as_view()),
    path('<int:pk>/delete/', views.ProductMixing.as_view()),
    path('', views.ProductMixing.as_view())
]

