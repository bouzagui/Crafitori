from django.shortcuts import render
from django.contrib.auth import authenticate, login, logout
from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import generics, mixins
from django.contrib.auth.models import User
from .serializers import UserSerializer, UserUpdateSerializer
from .models import Profile
from django.contrib.auth.views import LoginView, LogoutView
from django.utils.decorators import method_decorator
from django.views.decorators.csrf import csrf_exempt
from django.contrib.auth.forms import AuthenticationForm


## Advanced Login view
class APILoginView(APIView):
    def post(self, request, *args, **kwargs):
        form = AuthenticationForm(data=request.data)
        if form.is_valid():
            user = form.get_user()
            login(request, user)
            return Response({"message": "Login successful"}, status=status.HTTP_200_OK)
        return Response({"errors": form.errors}, status=status.HTTP_400_BAD_REQUEST)

#Advanced Logout
@method_decorator(csrf_exempt, name='dispatch')
class APILogoutView(APIView):
    def post(self, request, *args, **kwargs):
        if request.user.is_authenticated:
            logout(request)
            return Response({"message": "Logout successful"}, status=status.HTTP_200_OK)
        else:
            return Response({"message": "You're not logged in"}, status=status.HTTP_400_BAD_REQUEST)


class UserMixing(generics.GenericAPIView,
                    mixins.ListModelMixin,
                    mixins.RetrieveModelMixin,
                    mixins.CreateModelMixin,
                    mixins.DestroyModelMixin,
                    mixins.UpdateModelMixin):

    queryset = User.objects.all()
    serializer_class = UserSerializer

    def get(self, request, *args, **kwargs):
        pk = kwargs.get("pk")
        if pk is not None:
            return self.retrieve(request, *args, **kwargs)
        return self.list(request, *args, **kwargs)

    def post(self, request, *args, **kwargs):
        return self.create(request, *args, **kwargs)

    def put(self, request, *args, **kwargs):
        return self.update(request, *args, **kwargs)

    def delete(self, request, *args, **kwargs):
        return self.destroy(request, *args, **kwargs)

    # def perform_create(self, serializer):
    #     user = serializer.save()
    #     Profile.objects.create(user=user)


class UserUpdateView(generics.UpdateAPIView):
    queryset = User.objects.all()
    serializer_class = UserUpdateSerializer
    lookup_field = 'pk'



## Basic implementation of Login
# class LoginAPIView(APIView):
#     def post(self, request, *args, **kwargs):
#         username = request.data.get('username')
#         password = request.data.get('password')

#         user = authenticate(request, username=username, password=password)

#         if user is not None:
#             login(request, user)  # Create a session for the user
#             return Response({"message": "Login successful!"}, status=status.HTTP_200_OK)
#         else:
#             return Response({"error": "Invalid credentials"}, status=status.HTTP_401_UNAUTHORIZED)

# class LogoutAPIView(APIView):
#     def post(self, request, *args, **kwargs):
#         if request.user.is_authenticated:
#             logout(request)
#             return Response({"message": "Logout successful!"}, status=status.HTTP_200_OK)
#         else:
#             return Response({"error": "You're not logged in."}, status=status.HTTP_400_BAD_REQUEST)
