from django.contrib import admin
from api.models import CustomUser, Form, Answer, Question, Options, Responses
# Register your models here.

admin.site.register([CustomUser, Answer, Form, Question,Options,Responses])