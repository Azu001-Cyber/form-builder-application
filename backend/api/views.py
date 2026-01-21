
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

# views.py
from rest_framework import viewsets, permissions
from .permissions import IsOwnerOrReadOnly
from .models import Form, Question, Options, Responses, Answer
from .serializers import (
    FormSerializer,
    QuestionSerializer,
    OptionSerializer,
    ResponseSerializer,
    AnswerSerializer,
)

# Form ViewSet
class FormViewSet(viewsets.ModelViewSet):
    queryset = Form.objects.all().order_by("-created_at")
    serializer_class = FormSerializer
    permission_classes = [permissions.IsAuthenticated, IsOwnerOrReadOnly]

    def perform_create(self, serializer):
        # Automatically set the owner to the logged-in user
        serializer.save(owner=self.request.user)


# Question ViewSet
class QuestionViewSet(viewsets.ModelViewSet):
    queryset = Question.objects.all().order_by("order")
    serializer_class = QuestionSerializer
    permission_classes = [permissions.IsAuthenticated]


# Options ViewSet
class OptionViewSet(viewsets.ModelViewSet):
    queryset = Options.objects.all().order_by("order")
    serializer_class = OptionSerializer
    permission_classes = [permissions.IsAuthenticated]


# Responses ViewSet
class ResponseViewSet(viewsets.ModelViewSet):
    queryset = Responses.objects.all().order_by("-submitted_at")
    serializer_class = ResponseSerializer
    permission_classes = [permissions.AllowAny]  # allow public form submissions

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)

        if not serializer.is_valid():
            print("❌ RESPONSE SERIALIZER ERRORS:", serializer.errors)
            return Response(serializer.errors, status=400)

        return super().create(request, *args, **kwargs)


# Answer ViewSet
class AnswerViewSet(viewsets.ModelViewSet):
    queryset = Answer.objects.all().order_by("-created_at")
    serializer_class = AnswerSerializer
    permission_classes = [permissions.IsAuthenticated]
