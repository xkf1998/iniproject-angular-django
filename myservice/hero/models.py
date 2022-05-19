from django.db import models

# Create your models here.

class Hero(models.Model):
    id = models.IntegerField(primary_key=True)
    name = models.CharField(max_length=50, unique=True, null=False)

    def __str__(self):
        return self.name

    def get_objects(self):
        data = {
            'id' : self.id,
            'name' : self.name
        }
        return data

