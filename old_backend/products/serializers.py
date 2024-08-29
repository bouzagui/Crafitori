from products.models import Product
from rest_framework import serializers


class ProductSerializer(serializers.ModelSerializer):
    my_discount = serializers.SerializerMethodField(read_only=True)
    class Meta:
        model = Product
        fields = ['title',
                  'description',
                  'price',
                  'sale_price',
                  'my_discount',
                  'id']


    def get_my_discount(self, obj):
        return  obj.get_discount()
