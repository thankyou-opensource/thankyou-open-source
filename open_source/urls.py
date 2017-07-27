from django.conf.urls import url, include
from django.contrib import admin
from . import views

urlpatterns = [
    url(r'^admin/', admin.site.urls),
    url(r'^api/', include('api.urls')),
    url(r'^api-auth/', include(
        'rest_framework.urls', namespace='rest_framework')),
    url(r'list/(?P<title>.+)/$',
        views.thanks_list, name='thanks_list'),
    url(r'thanks/(?P<title>.+)/$',
        views.thanks, name='thanks'),
    url(r'letter/(?P<id>[0-9]+)/(.+)/$',
        views.letter, name='letter'),
    url(r'why/$',
        views.why, name='why'),
    url(r'^', views.frontpage),
]
