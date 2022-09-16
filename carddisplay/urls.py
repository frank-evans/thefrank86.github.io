from django.urls import path, include


from . import views

urlpatterns = [
    path('', views.index, name='index'),
    path("result", views.result, name="result"),
    path("test", views.test, name="test"),
    path("test2", views.test2, name="test2")
]