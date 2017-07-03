from rest_framework import viewsets

from accounts.models import User
from accounts.serializers import UserSerializer
from talks.models import Talk
from talks.serializers import TalkSerializer


class TalkViewSet(viewsets.ModelViewSet):
    """
    Viewset for retrieving an individual or set of talks,
    plus updating and deleting individual talks.
    """
    queryset = Talk.objects.all()
    serializer_class = TalkSerializer


class UserViewSet(viewsets.ModelViewSet):
    """
    Viewset for retrieving an individual or set of users,
    plus updating and deleting individual users.
    """
    queryset = User.objects.all()
    serializer_class = UserSerializer
