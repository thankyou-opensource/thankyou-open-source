from django.db.models import F
from rest_framework import viewsets
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.reverse import reverse
from thanks.models import Thanks
from thanks.serializers import ThanksSerializer


# Create your views here.
class ThanksViewSet(viewsets.ModelViewSet):
    serializer_class = ThanksSerializer

    def get_queryset(self):
        queryset = Thanks.objects.all().order_by('-update_time')
        repo = self.request.query_params.get('repo', None)
        if repo is not None:
            queryset = queryset.filter(repo=repo)
        return queryset

    def partial_update(self, request, *args, **kwargs):
        kwargs['partial'] = True
        if 'likes' in request.data.dict():
            Thanks.objects.filter(pk=kwargs['pk']).update(likes=F('likes')+1)
        return self.update(request, *args, **kwargs)


@api_view(['GET'])
def api_root(request, format=None):
    return Response({
        'thanks': reverse('thanks_list', request=request, format=format),
    })
