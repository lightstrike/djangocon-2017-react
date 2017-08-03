from rest_framework import serializers

from .models import Comment, Talk, Vote


class CommentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Comment
        fields = ('id', 'user', 'talk', 'content', 'created', 'modified')


class VoteSerializer(serializers.ModelSerializer):
    class Meta:
        model = Vote
        fields = ('id', 'user', 'talk', 'vote', 'created', 'modified')


class TalkSerializer(serializers.ModelSerializer):

    comments = serializers.SerializerMethodField()
    downvotes = serializers.SerializerMethodField()
    upvotes = serializers.SerializerMethodField()
    user_vote = serializers.SerializerMethodField()

    def get_comments(self, obj):
        first_10_comments = Comment.objects.filter(talk=obj)[:10]
        return CommentSerializer(first_10_comments, many=True).data

    def get_downvotes(self, obj):
        return Vote.objects.filter(
            talk=obj,
            vote=False).count()

    def get_upvotes(self, obj):
        return Vote.objects.filter(
            talk=obj,
            vote=True).count()

    def get_user_vote(self, obj):
        """
        Whether the current user has upvoted this talk (True),
        downvoted this talk (False), or neither (None)
        """
        request = self.context['request']
        user_object = request.user
        if user_object.is_authenticated():
            user_vote = Vote.objects.filter(
                user=user_object,
                talk=obj)
            if user_vote.exists():
                return user_vote.first().vote
        return None

    class Meta:
        model = Talk
        fields = ('id', 'title', 'speaker_name', 'date', 'comments', 'user_vote',
                  'description', 'downvotes', 'upvotes', 'created', 'modified')
