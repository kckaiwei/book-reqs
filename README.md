# book-reqs

format of the seed data:
---

`Title	Author	Recommender	Source	Amazon_Link	Description	Type	Genre	Length	Publish_Year	On_List	Review_Excerpt`

Note that the data only utilizes, Title, Author, Recommender, Source, Amazon_link

Running the server:
---

while in `book-reqs/bookreqs`

run `python manage.py collectstatic`

run `python manage.py runserver`
