from django.db import models


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

    #count(recommendations__id)

    #queryset.extra


class Recommendation(models.Model):
    # Allow blank since it is noted in the problem
    recommender = models.ForeignKey(Recommender, on_delete=models.CASCADE, null=True)
    book = models.ForeignKey(Book, on_delete=models.CASCADE, null=True)
    source = models.ForeignKey(RecommendationSource, on_delete=models.CASCADE, null=True)
