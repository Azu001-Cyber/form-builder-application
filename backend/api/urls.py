
from django.urls import path, include
from rest_framework.routers import DefaultRouter
# from .views import FormViewSet, PublicFormViewSet, ResponseViewSet. 
from .views import SignupView, EmailLoginView
from rest_framework_simplejwt.views import TokenObtainPairView
from .views import GoogleAuthView
from .views import ( EmailLoginView, SignupView, GoogleAuthView, FormViewSet, OptionViewSet, ResponseViewSet,AnswerViewSet, QuestionViewSet)
# Create router and register viewsets 
router = DefaultRouter() 
router.register(r"forms", FormViewSet, basename="forms"),
router.register(r"options", OptionViewSet, basename="options")
router.register(r"responses", ResponseViewSet, basename="responses"),
router.register(r"answers", AnswerViewSet, basename="answers"),
router.register(r"questions", QuestionViewSet, basename='questions')

# Combine manual paths with router URLs 
urlpatterns = [ path("login/user", EmailLoginView.as_view(), name="login"),
                path("register/user", SignupView.as_view(), name="register"), 
                path("refresh/", TokenObtainPairView.as_view(), name="token_refresh"), 
                path("auth/google/", GoogleAuthView.as_view()), 
                path("", include(router.urls)), 
                ]