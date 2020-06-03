# book-reqs


Credentials:
---

Since this is a test project, and will NEVER be used in production, below are test credentials for demonstration:

user: iago

pass: test

Installing dependencies:
---

while in `book-reqs/`

run `pip install -r requirements.txt`

it is STRONGLY recommended to have a virtualenv for this!


Running the server:
---

while in `book-reqs/bookreqs`

run `python manage.py collectstatic`

run `python manage.py runserver`

Running the tests:
---

while in `book-reqs/bookreqs`

run `python manage.py test`

while in `book-reqs/brfront`

run `npm run test`

Building React bundle:
---

while in `book-reqs/brfront`

run `npm run build-debug`

or 

run `npm run build-jsx`

this will build to the `dist` folder, the `main.js` must be copied into 
`book-reqs/bookreqs/static/js`

additionally, `index.html` needs to be added to 
`book-reqs/bookreqs/recommender/templates/recommender/index.html`

A minor change must be made to `index.html`


`<script src="{% static "js/main.js" %}"></script></body>`
  
must be added for django to detect the static files; due to a lack of time,
the above workflow has not been streamlined. Ideally I would create a script 
to copy/modify the file in the correct location.

Backend
---

Database is sqlite3, saw no reason to use a full database for the specifications.
Initial data is populated via a management command, 
called via `python manage.py populate_books`.
This is only run once to seed the initial database in this case.

We have split all our important entities into their own objects so we can 
inspect relationships easier, as well as making it easier to extend functionality.
By creating books separately, it becomes easy to create a user recommendation list
and tie new books to that last without affecting anyone else.

In regards to security, Django already cleans input into the database, which in this
case we use strings of titles as the main identifiers, which would be cleaned.
Decorators are used to ensure that the visitor is logged in as a user before 
being able to access any apis. The front end will not work unless one is logged in.
CSRF token is passed for the PUT calls.

Regarding testing, the built-in Django testing suite is more than sufficient
for our purposes. Mocking a client to test logged-in and logged-out behaviour
is quite easy with the built-in client.

Frontend
---

React is obviously what the application is built around. Having never used
React hooks before, this was an enjoyable exercise in learning about them
and I anticipate using them in future projects. The ability to break things into
functional components that can react to changes without any of the usual clutter
is a very powerful tool.

Styled-component will also be another tool I will add to my tool box; no longer
having to mess with classes and worrying about clashing classes will make code
more stable. Bootstrap is used in conjunction with styled-component to split
the screen into 3 panels, two to hold lists, and a center for controls.

Testing the react components did yield more difficulty. With react-hooks being
a relatively new technology, some testing tools were not full caught up; however,
jest, and enzyme came through, and via mocking functions I was able to test the
necessary functions. 

Webpack is used for bundling here.