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
        most_recent_10_comments = Comment.objects.filter(
            talk=obj).order_by('-id')[:10]
        return CommentSerializer(most_recent_10_comments, many=True).data

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
            try:
                user_vote = Vote.objects.get(
                    user=user_object,
                    talk=obj)
                return user_vote.vote
            except Vote.DoesNotExist:
                return None
        return None

    class Meta:
        model = Talk
        fields = ('id', 'title', 'speaker_name', 'date', 'comments', 'user_vote',
                  'description', 'downvotes', 'upvotes', 'created', 'modified')
