from django.conf.urls import include, url
from django.contrib import admin
from rest_framework.routers import DefaultRouter

from talks.views import TalkViewSet

router = DefaultRouter()
router.register(r'talks', TalkViewSet)

urlpatterns = [
    url(r'^admin/', admin.site.urls),
    url(r'^api/v1/', include(router.urls)),
]
