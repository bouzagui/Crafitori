# serializers.py
from rest_framework import serializers
from django.contrib.auth import get_user_model
from .models import Profile, Product

User = get_user_model()

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'email', 'first_name', 'last_name', 'fullname']

class ProfilePublicSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)
    products = serilizers.MehtodField()

    class Meta:
        model = Profile
        fields = ['user', 'bio', 'image']

class UserPrivateSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'email', 'first_name', 'last_name', 'fullname', 'date_joined', 'last_login']
        read_only_fields = ['id', 'email', 'date_joined', 'last_login']

class ProfilePrivateSerializer(serializers.ModelSerializer):
    user = UserPrivateSerializer()

    class Meta:
        model = Profile
        fields = ['user', 'bio', 'image']

    def update(self, instance, validated_data):
        user_data = validated_data.pop('user', {})
        # Update User model fields
        for attr, value in user_data.items():
            setattr(instance.user, attr, value)
        instance.user.save()

        # Update Profile model fields
        for attr, value in validated_data.items():
            setattr(instance, attr, value)
        instance.save()

        return instance

class ProductSerializer(serializers.ModelSerializer):
    owner_profile_url = serializers.HyperlinkedRelatedField(
        source='owner',
        view_name='public-profile-detail',
        read_only=True,
        lookup_field='pk'
    )

    class Meta:
        model = Product
        fields = ['id', 'title', 'description', 'price', 'sale_price', 'category', 'owner', 'owner_name', 'owner_profile_url']
        read_only_fields = ['owner']

# views.py
from rest_framework import generics, permissions
from rest_framework.response import Response
from .models import Profile, Product
from .serializers import ProfilePublicSerializer, ProfilePrivateSerializer, ProductSerializer

class PublicProfileView(generics.RetrieveAPIView):
    queryset = Profile.objects.all()
    serializer_class = ProfilePublicSerializer
    lookup_field = 'user__id'  # This allows us to lookup by user ID

class PrivateProfileView(generics.RetrieveUpdateAPIView):
    serializer_class = ProfilePrivateSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_object(self):
        return self.request.user.profile

class ProductListCreateView(generics.ListCreateAPIView):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]

    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)

# urls.py
from django.urls import path
from .views import PublicProfileView, PrivateProfileView, ProductListCreateView

urlpatterns = [
    path('profiles/<int:user__id>/', PublicProfileView.as_view(), name='public-profile-detail'),
    path('my-profile/', PrivateProfileView.as_view(), name='private-profile'),
    path('products/', ProductListCreateView.as_view(), name='product-list-create'),
]
