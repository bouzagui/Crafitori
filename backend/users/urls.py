from django.urls import path
from . import views

urlpatterns = [
    path('<int:pk>/', views.UserMixing.as_view(),  name='user-detail'),
    path('<int:pk>/update/', views.UserUpdateView.as_view(), name='user-update'),
    path('<int:pk>/delete/', views.UserMixing.as_view(), name='user-delete'),
    path('register/', views.UserMixing.as_view(), name='user-register'),
    path('login/', views.LoginAPIView.as_view(), name ='user-login'),
    path('logout/', views.LogoutAPIView.as_view(), name='user-logout'),
    path('', views.UserMixing.as_view()),
]
