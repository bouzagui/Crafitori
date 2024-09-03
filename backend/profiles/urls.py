from django.urls import path
from accounts.views import PublicProfileView, PrivateProfileView

app_name = 'profiles'

urlpatterns = [
    path('<int:user__id>/', PublicProfileView.as_view(), name='public-profile-detail'),
    path('my-profile/', PrivateProfileView.as_view(), name='private-profile'),
]
