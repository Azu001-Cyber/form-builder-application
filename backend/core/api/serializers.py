from rest_framework import serializers
from .models import Form, Question, Options, Responses, Answer, CustomUser
from rest_framework_simplejwt.serializers import TokenObtainSlidingSerializer

class EmailTokenObtainPairSerializer(TokenObtainSlidingSerializer):
    username_field = 'email'


class SignupSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)

    class Meta:
        model = CustomUser
        fields = ['email', 'password']

    def create(self, validated_data):
        user = CustomUser.objects.create_user(
            email=validated_data['email'],
            password=validated_data['password']
        )

        return user
    
class OptionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Options
        fields = "__all__"

class QuestionSerializer(serializers.ModelSerializer):
    options = OptionSerializer(many=True, required=False)

    class Meta:
        model = Question
        fields = "__all__"

    def create(self, validated_data):
        options_data = validated_data.pop("options", [])
        question = Question.objects.create(**validated_data)

        for option in options_data:
            Options.objects.create(question=question, **option)

        return question


class FormSerializer(serializers.ModelSerializer):
    questions = QuestionSerializer(many=True, required=False)

    class Meta:
        model = Form
        fields = "__all__"

    def create(self, validated_data):
        questions_data = validated_data.pop("questions", [])
        form = Form.objects.create(**validated_data)

        for question_data in questions_data:
            options = question_data.pop("options", [])
            question = Question.objects.create(form=form, **question_data)

            for option in options:
                Options.objects.create(question=question, **option)

        return form


class AnswerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Answer
        fields = "__all__"


class ResponseSerializer(serializers.ModelSerializer):
    answers = AnswerSerializer(many=True)

    class Meta:
        model = Responses
        fields = "__all__"

    def create(self, validated_data):
        answers_data = validated_data.pop("answers")
        response = Responses.objects.create(**validated_data)

        for answer in answers_data:
            Answer.objects.create(response=response, **answer)

        return response

class OptionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Options
        fields = ["id", "option_text", 'is_correct', "order"]


class QuestionSerializer(serializers.ModelSerializer):
    options = OptionSerializer(many=True, read_only=True)

    class Meta:
        model = Question
        fields = [
            "id",
            "form_id",
            "question_text",
            "question_type",
            "required",
            "order",
            "created_at",
            "options",
        ]


class FormSerializer(serializers.ModelSerializer):
    question = QuestionSerializer(many=True, read_only=True)

    class Meta:
        model = Form
        fields = [
            "id",
            "owner",
            "title",
            "description",
            "is_quiz",
            "is_published",
            "created_at",
            "updated_at",
            'questions',
        ]

class AnswerSerializer(serializers.ModelSerializer):
    selected_option_id = OptionSerializer(read_only=True) 
    class Meta: 
        model = Answer 
        fields = [ "id", 
                "response_id", 
                "question_id", 
                "answer_text", 
                "selected_option_id", 
                "created_at", ]
        
class ResponseSerializer(serializers.ModelSerializer):
    answers = AnswerSerializer(many=True, read_only=True)

    class Meta:
        model = Responses
        fields = [
            "id",
            "form_id",
            "submitted_at",
            "score",
            "answers"
        ]