from products.models import Product
from rest_framework import serializers
from categories.serializers import CategorySerializer
from categories.models import Category
from accounts.serializer import UserSerializer


class ProductSerializer(serializers.ModelSerializer):
    category_id = serializers.IntegerField(write_only=True)
    category = CategorySerializer(read_only=True)
    owner = UserSerializer(read_only=True)
    # owner_name = serializers.CharField(source='owner.fullname', read_only=True)
    owner_profile_url = serializers.HyperlinkedRelatedField(
        source='owner',
        view_name='profiles:public-profile-detail',
        read_only=True,
        lookup_field='id',
        lookup_url_kwarg='user__id'
    )

    class Meta:
        model = Product
        fields = ['id', 'title', 'description', 'price', 'category_id', 'category', 'owner', 'owner_profile_url']

    def create(self, validated_data):
        category_id = validated_data.pop('category_id')
        category = Category.objects.get(id=category_id)
        product = Product.objects.create(category=category, **validated_data)
        return product


class UpdateProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = ['title', 'description', 'price', 'id']
        extra_kwargs = {
            'title': {'required': False},
            'description': {'required': False},
            'price': {'required': False},
            'category': {'required': False}
        }
