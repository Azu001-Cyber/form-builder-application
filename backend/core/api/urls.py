
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import FormViewSet, ResponseViewSet, OptionViewSet, AnswerViewSet,QuestionViewSet
from .views import SignupView, EmailLoginView
from rest_framework_simplejwt.views import TokenObtainPairView
from .views import GoogleAuthView
# urlpatterns = [
#     path('login/user', EmailLoginView.as_view(), name='login' ),
#     path('register/user', SignupView.as_view(), name='register'),
#     path("refresh/", TokenObtainPairView.as_view(), name="token_refresh"),
#     path("auth/google/", GoogleAuthView.as_view()),

# ]

router = DefaultRouter()
router.register(r'forms', FormViewSet) 
router.register(r'questions', QuestionViewSet) 
router.register(r'options', OptionViewSet) 
router.register(r'responses', ResponseViewSet) 
router.register(r'answers', AnswerViewSet)

urlpatterns = [
    path('', include(router.urls)),
    path('login/user', EmailLoginView.as_view(), name='login' ),
    path('register/user', SignupView.as_view(), name='register'),
    path("refresh/", TokenObtainPairView.as_view(), name="token_refresh"),
    path("auth/google/", GoogleAuthView.as_view()),
]