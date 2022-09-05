from unicodedata import name
from django.http import HttpResponseRedirect 
from django.shortcuts import render
from .models import *
from django.core.management import call_command


# Create your views here.
def index(request):

        return render(request, "carddisplay/index.html", {
            "carddisplay": card.objects.all()
        })


def result(request):
    if request.method == "POST":

        # reset object data for each search
        card.objects.all().delete()

        # update object data based on set sellected
        setsellect = request.POST["setsellect"]
        call_command('updatemodels', sellect=setsellect)

        return render(request, "carddisplay/result.html", {
            "carddisplay": card.objects.all()
        })