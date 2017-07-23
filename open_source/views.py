from django.shortcuts import render


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
