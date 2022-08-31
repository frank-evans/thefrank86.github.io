from django.db import models
# import pandas as pd

# Create your models here.

#class Question(models.Model):
    #question_text = models.CharField(max_length=200)
    #pub_date = models.DateTimeField('date published')

#class Choice(models.Model):
    #question = models.ForeignKey(Question, on_delete=models.CASCADE)
    #choice_text = models.CharField(max_length=200)
    #votes = models.IntegerField(default=0)


class card(models.Model):
    set = models.CharField(max_length=64)
    name = models.CharField(max_length=64)
    image = models.CharField(max_length=128)

    def __str__(self):
        return f"{self.set}: {self.name}: {self.image}"


class type(models.Model):
    set = models.CharField(max_length=64)
    name = models.CharField(max_length=64)
    search = models.CharField(max_length=64)
    
    def __str__(self):
        return f"{self.id}: {self.name}: {self.search}"