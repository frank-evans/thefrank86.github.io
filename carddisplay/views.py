from unicodedata import name
from django.shortcuts import render
from .models import *
from django.core.management import call_command

#import pandas as pd
call_command('updatemodels')
# Create your views here.
def index(request):
    #df1 = pd.read_csv('https://api.scryfall.com/cards/search?format=csv&q=s:neo ', usecols = ['set', 'name', 'image_uri'])

# is any of this going to work?
    #df1.set_index("name", inplace=True)
    #card.image = df1.loc[['{name}'], ['image_uri']]
    #card.name = {name}
    #card.set = df1.loc[['{name}'], ['set']] 

    #call_command('flush')

    return render(request, "carddisplay/index.html", {
        "carddisplay": card.objects.all()
    })