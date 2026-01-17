
from django.urls import path, include
from rest_framework.routers import DefaultRouter
# from .views import FormViewSet, PublicFormViewSet, ResponseViewSet. 
from .views import SignupView, EmailLoginView
from rest_framework_simplejwt.views import TokenObtainPairView
from .views import GoogleAuthView
urlpatterns = [
    path('login/user', EmailLoginView.as_view(), name='login' ),
    path('register/user', SignupView.as_view(), name='register'),
    path("refresh/", TokenObtainPairView.as_view(), name="token_refresh"),
    path("auth/google/", GoogleAuthView.as_view()),

]
# router.register("forms", FormViewSet, basename="forms")
# router.register("public/forms", PublicFormViewSet, basename="public-forms")
# router.register("responses", ResponseViewSet, basename="responses")
