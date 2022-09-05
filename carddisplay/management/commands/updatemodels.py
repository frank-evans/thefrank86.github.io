from django.core.management.base import BaseCommand
import pandas as pd
from carddisplay.models import card
# , search


class Command(BaseCommand):
    help = 'import booms'

    def add_arguments(self, parser):
        # don't "pass"
        # parse variable from index.html from the result view (request.POST) name variable
        parser.add_argument('-s', '--sellect', type=str)

    def handle(self, *args, **kwargs):
        sellect = kwargs['sellect']
        #(set structure) unique = "s:dmu"
        #(cardname structure) unique = "cardname-cardname"
        unique = f"s:{sellect}"
        # use Pandas to generate data frame (table), from the keyword csv file search.  Using the scryfall api
        df1 = pd.read_csv(f"https://api.scryfall.com/cards/search?format=csv&q={unique} ", usecols = ['set', 'name', 'mana_cost', 'image_uri'])
        # iterate data frame data onto the card model and save
        for SET,NAME,COST,IMAGE in zip(df1.set,df1.name,df1.mana_cost,df1.image_uri):
            models=card(set=SET,name=NAME,cost=COST,image=IMAGE)
            models.save()