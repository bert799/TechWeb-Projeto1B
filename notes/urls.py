from django.urls import path

from . import views

urlpatterns = [
    path('', views.index, name='index'),
    path('notes', views.index, name='index'),
    path('tags', views.tags, name='tags'),
    path('tags/<str:name>', views.tagNotes, name='tagNotes'),
    path('update', views.update, name='update'),
    path('delete', views.delete, name='delete'),
]
