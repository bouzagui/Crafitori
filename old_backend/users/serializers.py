from rest_framework import serializers
from django.contrib.auth.models import User
from .models import Profile  # Assuming you have a Profile model

class UserSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True, required=True)
    confirm_password = serializers.CharField(write_only=True, required=True)
    is_seller = serializers.BooleanField(source='profile.is_seller', read_only=True)

    class Meta:
        model = User
        fields = ['username', 'email', 'password', 'confirm_password', 'id', 'is_seller']

    def validate(self, data):
        if self.instance is None:  # This is a create operation
            if 'password' not in data or 'confirm_password' not in data:
                raise serializers.ValidationError("Both password and confirm_password are required for registration.")
            if data['password'] != data['confirm_password']:
                raise serializers.ValidationError("Passwords must match.")
        else:  # This is an update operation
            if 'password' in data or 'confirm_password' in data:
                if 'password' not in data or 'confirm_password' not in data:
                    raise serializers.ValidationError("Both password and confirm_password must be provided together for password change.")
                if data['password'] != data['confirm_password']:
                    raise serializers.ValidationError("Passwords must match.")
        return data

    def create(self, validated_data):
        validated_data.pop('confirm_password')  # Remove confirm_password as it is not needed for creating the user
        user = User.objects.create_user(**validated_data)
        Profile.objects.create(user=user)  # Create a Profile linked to the user
        return user

    # def update(self, instance, validated_data):
    #     password = validated_data.pop('password', None)
    #     validated_data.pop('confirm_password', None)

    #     for attr, value in validated_data.items():
    #         setattr(instance, attr, value)

    #     if password is not None:
    #         instance.set_password(password)

    #     instance.save()
    #     return instance


class UserUpdateSerializer(serializers.ModelSerializer):
    is_seller = serializers.BooleanField(source='profile.is_seller', required=False)

    class Meta:
        model = User
        fields = ['username', 'email', 'is_seller']
        extra_kwargs = {
            'username': {'required': False},
            'email': {'required': False}
        }

    def update(self, instance, validated_data):
        profile_data = validated_data.pop('profile', {})

        for attr, value in validated_data.items():
            setattr(instance, attr, value)

        instance.save()

        profile = instance.profile
        if 'is_seller' in profile_data:
            profile.is_seller = profile_data['is_seller']
            profile.save()

        return instance

