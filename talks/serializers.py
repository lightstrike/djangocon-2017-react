from rest_framework import serializers

from .models import Comment, Talk, Vote


class TalkSerializer(serializers.ModelSerializer):
    class Meta:
        model = Talk
        fields = ('id', 'title', 'speaker_name', 'date',
                  'description', 'created', 'modified')


class VoteSerializer(serializers.ModelSerializer):
    class Meta:
        model = Vote
        fields = ('id', 'user', 'talk', 'vote', 'created', 'modified')


class CommentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Comment
        fields = ('id', 'user', 'talk', 'content', 'created', 'modified')
