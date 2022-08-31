from unicodedata import name
from django.shortcuts import render
from django.http import HttpResponse
from .models import *
#import pandas as pd

# Create your views here.
def index(request):
    #df1 = pd.read_csv('https://api.scryfall.com/cards/search?format=csv&q=s:neo ', usecols = ['set', 'name', 'image_uri'])

# is any of this going to work?
    #df1.set_index("name", inplace=True)
    #card.image = df1.loc[['{name}'], ['image_uri']]
    #card.name = {name}
    #card.set = df1.loc[['{name}'], ['set']] 
    
    return render(request, "carddisplay/index.html", {
        "carddisplay": card.objects.all()
    })