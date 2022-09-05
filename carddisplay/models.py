from django.db import models


# Create your models here.
# model used to save api card data based on search.  Display card image, etc
class card(models.Model):
    set = models.CharField(max_length=64)
    name = models.CharField(max_length=64)
    image = models.CharField(max_length=128)
    cost = models.CharField(max_length=64)

    def __str__(self):
        return f"{self.set}: {self.name}: {self.image}"

# model for advanced search features
class search(models.Model):
    set = models.CharField(max_length=64)
    name = models.CharField(max_length=64)
    # color/"mana_cost" {2}{R}
    color = models.CharField(max_length=64)
    
    def __str__(self):
        return f"{self.set}: {self.name}: {self.color}"