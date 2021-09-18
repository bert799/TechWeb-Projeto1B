from typing import Text
from django.db import models


class Tag(models.Model):
    tagName = models.CharField(max_length=100)
    def __str__(self):
        return self.tagName

class Note(models.Model):
    title = models.CharField(max_length=100)
    details = models.TextField(max_length=400)
    tag = models.ForeignKey(Tag, on_delete=models.SET_NULL, null=True)
    def __str__(self):
        id = self.id
        content =str(id)+"."+self.title
        return content
