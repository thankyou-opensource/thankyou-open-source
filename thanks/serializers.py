from .models import Thanks
from rest_framework import serializers


class ThanksSerializer(serializers.ModelSerializer):
    class Meta:
        model = Thanks
        fields = (
            'title', 'name', 'email', 'content',
            'create_time')
