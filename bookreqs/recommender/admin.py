from django.contrib import admin

from .models import *


class RecommendationInline(admin.TabularInline):
    model = Recommendation


class BookInline(admin.TabularInline):
    model = Book


class BookManyInline(admin.TabularInline):
    model = UserList.books.through


class BookAdmin(admin.ModelAdmin):
    inlines = [RecommendationInline]
    search_fields = ('title',)


class AuthorAdmin(admin.ModelAdmin):
    inlines = [BookInline]


class UserListAdmin(admin.ModelAdmin):
    inlines = [BookManyInline]


admin.site.register(Recommender)
admin.site.register(RecommendationSource)
admin.site.register(Recommendation)
admin.site.register(UserList, UserListAdmin)
admin.site.register(Book, BookAdmin)
admin.site.register(Author, AuthorAdmin)
