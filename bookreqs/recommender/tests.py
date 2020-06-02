from django.test import TestCase, Client
from django.contrib.auth.models import User
from recommender.models import Book, Author, Recommendation


# Create your tests here.
class RecommendationTestCase(TestCase):
    def setUp(self):
        self.test_user = User.objects.create()
        seuss = Author.objects.create(name="Dr. Seuss")
        cat = Book.objects.create(title="The Cat in the Hat")
        seuss.book_set.add(cat)
        places = Book.objects.create(title="Oh the Places We'll Go")
        seuss.book_set.add(places)
        seuss.save()

        dani = Author.objects.create(name="Dani Kollin")
        unincorp = Book.objects.create(title="The Unincorporated Man")
        dani.book_set.add(unincorp)
        dani.save()

        rec1 = Recommendation.objects.create(book=cat)
        rec2 = Recommendation.objects.create(book=cat)

        rec3 = Recommendation.objects.create(book=places)

        self.client = Client()
        self.client.force_login(self.test_user)

    def test_api_gets_author_books(self):
        response = self.client.get('/recommendations/', {'author': 'Dr. Seuss'})
        self.assertEqual(response.json()["data"], [{"title": "The Cat in the Hat", "author": "Dr. Seuss"},
                                                   {"title": "Oh the Places We\'ll Go", "author": "Dr. Seuss"}])

    def test_api_get_blank(self):
        response = self.client.get('/recommendations/', {'author': 'Calvin and Hobbes'})
        self.assertEqual(response.json()["data"], [])

    def test_api_gets_recommendation_count(self):
        response = self.client.get('/recommendations/', {'count': '2'})
        self.assertEqual(response.json()['data'], [{"title": "The Cat in the Hat", "author": "Dr. Seuss"}])

        response = self.client.get('/recommendations/', {'count': '1'})
        self.assertEqual(response.json()['data'], [{"title": "Oh the Places We\'ll Go", "author": "Dr. Seuss"}])

        response = self.client.get('/recommendations/', {'count': '5'})
        self.assertEqual(response.json()['data'], [])
