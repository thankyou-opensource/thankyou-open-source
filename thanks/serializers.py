from .models import Thanks
from rest_framework import serializers


class ThanksSerializer(serializers.ModelSerializer):
    class Meta:
        model = Thanks
        fields = (
            'id', 'title', 'name', 'email',
            'repo', 'likes', 'content', 'create_time')
