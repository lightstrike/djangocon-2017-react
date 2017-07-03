from django.conf.urls import include, url
from django.contrib import admin
from rest_framework.routers import DefaultRouter

from api.views import TalkViewSet, UserViewSet

# NOTE: Use `api-root` for reverse URL:
# http://www.django-rest-framework.org/api-guide/routers/#defaultrouter
router = DefaultRouter()
router.register(r'talks', TalkViewSet)
router.register(r'users', UserViewSet)

urlpatterns = [
    url(r'^admin/', admin.site.urls),
    url(r'^api/v1/', include(router.urls)),
]
