"""bookreqs URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/3.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.conf import settings
from django.conf.urls.static import static
from django.contrib.auth import views as auth_views
from django.urls import path
from recommender import views

urlpatterns = [
    path('admin/', admin.site.urls),
    path('recommendations/', views.get_count_recommended, name='recommendations_api'),
    path('authors/', views.get_author_list, name='authors_api'),
    path('save/', views.save_list, name='save_api'),
    path('user_list/', views.get_list, name='get_list_api'),
    path('', views.recommendations_page, name="recommendations"),
] + static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)


urlpatterns += [
    path("accounts/login/", auth_views.LoginView.as_view())
]