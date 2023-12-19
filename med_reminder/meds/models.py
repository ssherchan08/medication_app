from django.db import models
from django.conf import settings
from accounts.models import CustomUser
from datetime import datetime    
from multiselectfield import MultiSelectField

MED_TYPE_CHOICES = (
    ("Capsule","Capsule"),
    ("Drop","Drop"),
    ("Tablet","Tablet")
)

DAYS_OF_WEEK = (
    ("Monday", "Monday"),
    ("Tuesday", "Tuesday"),
    ("Wednesday", "Wednesday"),
    ("Thursday", "Thursday"),
    ("Friday", "Friday"),
    ("Saturday", "Saturday"),
    ("Sunday", "Sunday"),
)

class Medicine(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, related_name="user", on_delete=models.CASCADE)
    name = models.CharField(max_length=20)
    med_type = models.CharField(choices=MED_TYPE_CHOICES ,max_length=30)
    dose = models.CharField(max_length=20)
    amount = models.IntegerField(default=0)
    reminder =  models.TimeField(null=True, blank=True)
    reminder_days = MultiSelectField(choices=DAYS_OF_WEEK, max_choices=7, max_length=100)
    taken_on = MultiSelectField(choices=DAYS_OF_WEEK, max_choices=7, max_length=100)

    def __str__(self):
       return self.name

