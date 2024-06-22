from rest_framework import serializers

class StudentSerializer(serializers.Serializer):
    name = serializers.CharField(max_length=255)
    email = serializers.EmailField()
    state = serializers.ChoiceField(choices=[('accept', 'Accept'), ('reject', 'Reject')])

class RoomSerializer(serializers.Serializer):
    room_id = serializers.IntegerField()
    room_name = serializers.CharField(max_length=255)
    subscribers = serializers.ListField(child=serializers.EmailField())

# Additional serializers if needed
class FormSubmissionSerializer(serializers.Serializer):
    name = serializers.CharField(max_length=255)
    gender = serializers.CharField(max_length=10)
    percentage_12th = serializers.FloatField()
    college = serializers.CharField(max_length=255)
    stream = serializers.CharField(max_length=255)
    year_of_scholarship = serializers.IntegerField()
    scholarship_amount = serializers.FloatField()
    year_of_graduation = serializers.IntegerField()
    current_occupation = serializers.CharField(max_length=255)
