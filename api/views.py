from rest_framework import viewsets

from accounts.models import User
from accounts.serializers import UserSerializer
from talks.models import Comment, Talk, Vote
from talks.serializers import CommentSerializer, TalkSerializer, VoteSerializer


class CommentViewSet(viewsets.ModelViewSet):
    """
    Viewset for retrieving an individual or set of comments,
    plus updating and deleting individual comments.
    """
    queryset = Comment.objects.all()
    serializer_class = CommentSerializer
    filter_fields = ('id', 'user', 'talk', 'content')


class TalkViewSet(viewsets.ModelViewSet):
    """
    Viewset for retrieving an individual or set of talks,
    plus updating and deleting individual talks.
    """
    queryset = Talk.objects.all()
    serializer_class = TalkSerializer
    filter_fields = ('id', 'title', 'speaker_name', 'date', 'description',)


class UserViewSet(viewsets.ModelViewSet):
    """
    Viewset for retrieving an individual or set of users,
    plus updating and deleting individual users.
    """
    def initialize_request(self, request, *args, **kwargs):
        if 'pk' in kwargs:
            if kwargs['pk'] == 'me':
                kwargs['pk'] = request.user.id

        return super(UserViewSet, self).initialize_request(request, *args, **kwargs)

    queryset = User.objects.all()
    serializer_class = UserSerializer
    filter_fields = ('id', 'email', 'first_name', 'last_name', 'is_active',)


class VoteViewSet(viewsets.ModelViewSet):
    """
    Viewset for retrieving an individual or set of votes,
    plus updating and deleting individual votes.
    """
    queryset = Vote.objects.all()
    serializer_class = VoteSerializer
    filter_fields = ('id', 'user', 'talk', 'vote',)
