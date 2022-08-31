from unicodedata import name
from django.shortcuts import render
from .models import *
from django.core.management import call_command

# reset object data for each search
card.objects.all().delete()
# update object data based on search keyword
call_command('updatemodels')

# Create your views here.
def index(request):

    return render(request, "carddisplay/index.html", {
        "carddisplay": card.objects.all()
    })