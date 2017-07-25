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


@api_view(['GET'])
def api_root(request, format=None):
    return Response({
        'thanks': reverse('thanks_list', request=request, format=format),
    })
