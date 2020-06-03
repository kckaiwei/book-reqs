from django.contrib.auth.decorators import login_required
from recommender.models import Author, Book, UserList
from django.http import JsonResponse, HttpResponse
from django.shortcuts import render
from django.db.models import Count
import json


@login_required
def get_count_recommended(request):
    if request.method != 'GET':
        return HttpResponse(status=405)
    rec_count = request.GET.get('count', 0)
    author = request.GET.get('author', "")

    rec_list = []
    if rec_count:
        books = Book.objects.annotate(rec_count=Count('recommendation')).filter(rec_count=rec_count)
        for book in books.all():
            rec_list.append({'title': book.title, 'author': book.author.name,
                             'url': book.amazon_link if book.amazon_link else "#"})
        return JsonResponse({'data': rec_list})

    if author:
        try:
            author_obj = Author.objects.get(name=author)
            if not author_obj:
                return JsonResponse({})
            for book in author_obj.book_set.all():
                rec_list.append({'title': book.title, 'author': book.author.name,
                                 'url': book.amazon_link if book.amazon_link else "#"})
            return JsonResponse({'data': rec_list})
        except Author.DoesNotExist:
            pass

    return JsonResponse({'data': []})


@login_required
def get_author_list(request):
    if request.method != 'GET':
        return HttpResponse(status=405)
    authors = Author.objects.all()
    author_list = []
    for author in authors:
        author_list.append(author.name)
    return JsonResponse({'data': author_list})


@login_required
def recommendations_page(request):
    user = request.user
    return render(request, 'recommender/index.html')


@login_required
def save_list(request):
    body = json.loads(request.body)
    saved = body.get("data", [])
    user = request.user

    u_list, created = UserList.objects.get_or_create(user=user)
    if created:
        u_list.user = user
        u_list.save()

    u_list.books.clear()
    for book in saved:
        try:
            book_title = book["title"]
            u_list.books.add(Book.objects.get(title=book_title))

        except Book.DoesNotExist:
            pass

    u_list.save()

    return HttpResponse(status=200)


@login_required
def get_list(request):
    user = request.user
    u_list, created = UserList.objects.get_or_create(user=user)
    if created:
        u_list.user = user
        u_list.save()

    resp_list = []
    for book in u_list.books.all():
        resp_list.append({"title": book.title, "author": book.author.name, "url": book.amazon_link, "selected": False})

    return JsonResponse({"data": resp_list})
