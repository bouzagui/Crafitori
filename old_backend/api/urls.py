#!/usr/bin/python3

from django.urls import path
from . import views


urlpatterns = [
    path('', views.home),
]

