from django.db import models
from django.contrib.auth.models import User


class Author(models.Model):
    name = models.CharField(blank=True, max_length=256)

    def __str__(self):
        return self.name


class Recommender(models.Model):
    name = models.CharField(blank=True, max_length=256)

    def __str__(self):
        return self.name


class Book(models.Model):
    title = models.CharField(blank=True, max_length=256)
    author = models.ForeignKey(Author, on_delete=models.CASCADE, null=True)
    amazon_link = models.URLField(blank=True)

    def __str__(self):
        return self.title


class RecommendationSource(models.Model):
    source = models.URLField(blank=True)

    def __str__(self):
        return self.source


class Recommendation(models.Model):
    # Allow blank since it is noted in the problem
    recommender = models.ForeignKey(Recommender, on_delete=models.CASCADE, null=True)
    book = models.ForeignKey(Book, on_delete=models.CASCADE, null=True)
    source = models.ForeignKey(RecommendationSource, on_delete=models.CASCADE, null=True)


class UserList(models.Model):
    books = models.ManyToManyField(Book)
    user = models.OneToOneField(User, on_delete=models.CASCADE, null=True)

    def __str__(self):
        return self.user.username + "'s book list"
