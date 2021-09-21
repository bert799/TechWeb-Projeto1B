from django.shortcuts import render, redirect
from .models import Note, Tag
import json
import urllib


def index(request):
    if request.method == 'POST':
        title = request.POST.get('titulo')
        content = request.POST.get('detalhes')
        tagName = request.POST.get('tag')
        if tagName != '':
            tag, created = Tag.objects.get_or_create(tagName = tagName)
            if created:
                tag.save()
            note = Note(title = title, details = content, tag = tag)
        else:
            note = Note(title = title, details = content)
        note.save()
        return redirect('index')
    else:
        all_notes = Note.objects.all()
        return render(request, 'notes/notes.html', {'notes': all_notes})

def tags(request):
    all_tags = Tag.objects.all()
    return render(request, 'notes/tags.html', {'tags' : all_tags})

def tagNotes(request, name):
    tag = Tag.objects.filter(tagName = name)[0]
    filtered_notes = Note.objects.filter(tag = tag)
    return render(request, 'notes/tagNotes.html', {'notes' : filtered_notes, 'tag': tag})

def delete(request):
    if request.method == 'POST':
        params = {}
        corpo = request.body.decode('utf-8')
        for chave_valor in corpo.split('&'):
                keyList = chave_valor.split("=")
                keyList[0] = urllib.parse.unquote_plus(keyList[0], encoding = 'utf-8')
                keyList[1] = urllib.parse.unquote_plus(keyList[1], encoding = 'utf-8')
                params[keyList[0]] = keyList[1]
        noteId = params['id']
        note = Note.objects.filter(id=noteId)
        note.delete()
        return redirect('index')
    else:
        all_notes = Note.objects.all()
        return render(request, 'notes/notes.html', {'notes': all_notes})

def update(request):
    if request.method == 'POST':
        params = {}
        corpo = request.body.decode('utf-8')
        for chave_valor in corpo.split('&'):
                keyList = chave_valor.split("=")
                keyList[0] = urllib.parse.unquote_plus(keyList[0], encoding = 'utf-8')
                keyList[1] = urllib.parse.unquote_plus(keyList[1], encoding = 'utf-8')
                params[keyList[0]] = keyList[1]
        noteId = params['id']
        note = Note.objects.filter(id=noteId)
        tag, created = Tag.objects.get_or_create(tagName = params['tag'])
        if created:
            tag.save()
        note.update(title = params['title'], details = params['details'], tag = tag)
        return redirect('index')
    else:
        all_notes = Note.objects.all()
        return render(request, 'notes/notes.html', {'notes': all_notes})