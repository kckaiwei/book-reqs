from django.shortcuts import render
from django.contrib.auth.decorators import login_required
from recommender.models import Author, Book
from django.http import JsonResponse, HttpResponse
from django.db.models import Count


@login_required
def get_count_recommended(request):
    rec_count = request.GET.get('count', 0)
    author = request.GET.get('author', "")

    rec_list = []
    if rec_count:
        books = Book.objects.annotate(rec_count=Count('recommendation')).filter(rec_count=rec_count)
        for book in books.all():
            rec_list.append({'title': book.title, 'author': book.author.name})
        return JsonResponse({'data': rec_list})

    if author:
        try:
            author_obj = Author.objects.get(name=author)
            if not author_obj:
                return JsonResponse({})
            for book in author_obj.book_set.all():
                rec_list.append({'title': book.title, 'author': book.author.name})
            return JsonResponse({'data': rec_list})
        except Author.DoesNotExist:
            pass

    return JsonResponse({'data': []})
