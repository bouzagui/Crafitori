from products.models import Product, ProductImage
from rest_framework import serializers
from categories.serializers import CategorySerializer
from categories.models import Category
from accounts.serializer import UserSerializer


class ProductImageSerializer(serializers.ModelSerializer):
    image = serializers.ImageField(use_url=True)

    class Meta:
        model = ProductImage
        fields = ['id', 'image']


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
    images = ProductImageSerializer(many=True, read_only=True)
    uploaded_images = serializers.ListField(
        child=serializers.ImageField(max_length=100000, allow_empty_file=False, use_url=False),
        write_only=True,
        required=True #Disable in Developement
    )

    class Meta:
        model = Product
        fields = ['id', 'title', 'description', 'price', 'category_id', 'category', 'owner', 'owner_profile_url', 'images', 'uploaded_images']

    def validate_uploaded_images(self, value):
        # Ensure at least 1 image is provided
        if len(value) == 0:
            raise serializers.ValidationError("At least one image must be uploaded.")
        return value

    def create(self, validated_data):
        # Extract category_id and handle category association
        category_id = validated_data.pop('category_id')
        category = Category.objects.get(id=category_id)

        # Extract the uploaded images from the validated_data
        uploaded_images = validated_data.pop('uploaded_images')

        # Create the product instance
        product = Product.objects.create(category=category, **validated_data)

        # Handle the uploaded images
        for image in uploaded_images:
            ProductImage.objects.create(product=product, image=image)

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
