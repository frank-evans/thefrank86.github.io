from django.db import models
# import pandas as pd

# Create your models here.
class Question(models.Model):
    question_text = models.CharField(max_length=200)
    pub_date = models.DateTimeField('date published')

class Choice(models.Model):
    question = models.ForeignKey(Question, on_delete=models.CASCADE)
    choice_text = models.CharField(max_length=200)
    votes = models.IntegerField(default=0)


# df1 = pd.read_csv('https://api.scryfall.com/cards/search?format=csv&q=s:neo ', usecols = ['set', 'name', 'image_uri'])

# <html>
# x=0
# for x in range of len(df1-1)
# <div>
#    <img src="{{df1.iloc[x, 1]}}" />
# </div>
# </html>

# .iloc[row, column]
# print(df1.iloc[row, 2])
class card(models.Model):
    set = models.CharField(max_length=64)
    name = models.CharField(max_length=64)
    image = models.CharField(max_length=128)

    def __str__(self):
        return f"{self.set} {self.name} {self.image}"
    