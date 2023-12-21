from rest_framework import fields, serializers
from .models import Medicine, DAYS_OF_WEEK

class MedicineSerializer(serializers.ModelSerializer):

    reminder_days = fields.MultipleChoiceField(choices=DAYS_OF_WEEK)
    taken_on = fields.MultipleChoiceField(choices=DAYS_OF_WEEK)
    reminder = serializers.TimeField(format='%I:%M %p', input_formats='%I:%M %p')

    class Meta:
        model = Medicine
        fields = '__all__'
        