
from rest_framework import viewsets, permissions
from .models import Form, Responses
from .serializers import FormSerializer, ResponseSerializer
from rest_framework.response import Response
from .serializers import SignupSerializer, EmailTokenObtainPairSerializer
from rest_framework import generics
from rest_framework_simplejwt.views import TokenObtainPairView
# Create your views here.

# Authentication


class SignupView(generics.CreateAPIView): 
    serializer_class = SignupSerializer
    ...
class EmailLoginView(TokenObtainPairView):
    serializer_class = EmailTokenObtainPairSerializer
    ...

# Oauth setup

from google.oauth2 import id_token
from google.auth.transport import requests
from django.contrib.auth import get_user_model
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework_simplejwt.tokens import RefreshToken
from google.auth.transport import requests
import os

User = get_user_model()

GOOGLE_CLIENT_ID = os.environ.get('GOOGLE_CLIENT_ID')

class GoogleAuthView(APIView):
    def post(self, request):
        token = request.data.get("token")

        if not token:
            return Response(
                {"error": "Token not provided"},
                status=status.HTTP_400_BAD_REQUEST
            )
        
        try:
            idinfo = id_token.verify_oauth2_token(
                token,
                requests.Request(),
                GOOGLE_CLIENT_ID
            )

            email = idinfo.get("email")
            # first_name = idinfo.get("name", "")
            email_verified = idinfo.get("email_verified", False)


            if not email_verified:
                return Response(
                    {"error": "Email not verified"},
                    status=status.HTTP_400_BAD_REQUEST
                )
            user, created = User.objects.get_or_create(
                email=email,
                defaults={
                    "email":email,
                    },
            )

            if created:
                user.set_unusable_password()
                user.save

            refresh = RefreshToken.for_user(user)

            return Response({
                "access": str(refresh.access_token),
                "refresh": str(refresh),
                "is_new_user": created,
            })
        except ValueError:
            return Response(
                {"error":"Invalid Google token"},
                status=status.HTTP_400_BAD_REQUEST
            )