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
