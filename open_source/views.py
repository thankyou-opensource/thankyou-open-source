import json
from django.shortcuts import render, get_object_or_404
from thanks.models import Thanks


def frontpage(request):
    return render(
        request, 'frontpage.html',
    )


def thanks(request, title):
    return render(
        request, 'thanks_post.html',
        {
            'title': title
        }
    )


def thanks_list(request, title):
    return render(
        request, 'thanks_list.html',
        {
            'title': title
        }
    )


def why(request):
    return render(
        request, 'why.html')


def letter(request, id):
    thanks = get_object_or_404(Thanks, id=id)
    return render(
            request, 'letter.html',
            {
                'title': thanks.title,
                'content': thanks.content,
                'repo': thanks.repo
            })
