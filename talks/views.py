from rest_framework import viewsets

from .models import Talk
from .serializers import TalkSerializer


class TalkViewSet(viewsets.ModelViewSet):
    """
    Viewset for retrieving an individual or set of talks,
    plus updating and deleting individual talks.
    """
    queryset = Talk.objects.all()
    serializer_class = TalkSerializer
