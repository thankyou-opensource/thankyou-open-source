from django.conf.urls import url
from rest_framework.urlpatterns import format_suffix_patterns
from . import views

thanks_list = views.ThanksViewSet.as_view({
    'get': 'list',
    'post': 'create'
})

thanks_detail = views.ThanksViewSet.as_view({
    'get': 'retrieve',
})


urlpatterns = format_suffix_patterns([
    url(r'thanks/$', thanks_list, name='thanks_list'),
    url(r'thanks/(?P<pk>[0-9]+)/$', thanks_detail, name='thanks_detail'),
    url(r'$', views.api_root),
])
