from django.urls import path, include


from . import views

urlpatterns = [
    path('', views.index, name='index'),
    path('about', views.about, name='about'),
    path('contact', views.contact, name='contact'),
    path("result", views.result, name="result"),
    path("test", views.test, name="test"),
    path("test2", views.test2, name="test2")
]