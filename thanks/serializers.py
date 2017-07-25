from .models import Thanks
from rest_framework import serializers


class ThanksSerializer(serializers.ModelSerializer):
    class Meta:
        model = Thanks
        fields = (
            'id', 'title', 'name', 'email',
            'repo', 'content', 'create_time')
