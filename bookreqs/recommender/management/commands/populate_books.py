from django.core.management.base import BaseCommand
from recommender.models import *


class Command(BaseCommand):
    help = "populates database with seed txt"

    def handle(self, *args, **kwargs):
        # Entry point is via manage.py, so find file accordingly
        with open("recommender/management/commands/skyword-full-stack-coding-exercise-data.txt") as f:
            line = f.readline()
            while line:
                rec_data = line.split("\t")
                self.create_models(rec_data)

                line = f.readline()

    def create_models(self, rec_data):
        """
        Creates objects in database
        :param rec_data: list of book data
        :return:
        """
        if rec_data[0]:
            book, book_created = Book.objects.get_or_create(title=rec_data[0].strip())

        if rec_data[1]:
            author, author_created = Author.objects.get_or_create(name=rec_data[1].strip())
            if book_created:
                book.author = author
                book.save()

        if rec_data[2]:
            recdr, recdr_created = Recommender.objects.get_or_create(name=rec_data[2].strip())

        try:
            if rec_data[4]:
                if book:
                    book.amazon_link = rec_data[4].strip()
                    book.save()
        except IndexError:
            pass

        source, source_created = RecommendationSource.objects.get_or_create(source=rec_data[3].strip().strip('\n'))
        recomendation = Recommendation.objects.create(source=source)
        if recdr:
            recomendation.recommender = recdr
        if book:
            recomendation.book = book
        recomendation.save()
