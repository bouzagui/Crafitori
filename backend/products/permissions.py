from rest_framework.permissions import BasePermission

class IsSeller(BasePermission):
    """
    Custom permission to only allow users who are sellers to create products.
    """

    def has_permission(self, request, view):
        # Check if the user is authenticated and is a seller
        return request.user.is_authenticated and request.user.is_seller
