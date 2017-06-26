from rest_framework import serializers

from .models import Talk


class TalkSerializer(serializers.ModelSerializer):
    class Meta:
        model = Talk
        fields = ('id', 'title', 'speaker_name', 'date',
                  'description', 'created', 'modified')
