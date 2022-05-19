from django.shortcuts import render, get_object_or_404
from django.http import HttpResponse, JsonResponse, Http404, QueryDict
from .models import Hero
import json


def index(request):
    if request.method == 'GET':
        term = request.GET.get('name', '')
        if term != '':
            hero_list = list(Hero.objects.filter(name__contains=term))
        else:
            hero_list = list(Hero.objects.order_by('-id'))
        hero_list = [x.get_objects() for x in hero_list]
        hero_list = json.dumps(hero_list)
        return HttpResponse(hero_list)
    if request.method == 'PUT':
        body_unicode = request.body.decode('utf-8')
        body = json.loads(body_unicode)
        id = body['id']
        name = body['name']
        Hero.objects.filter(pk=id).update(name = name,)
        return HttpResponse("here is the put request")
    if request.method == 'POST':
        body_unicode = request.body.decode('utf-8')
        body = json.loads(body_unicode)
        id = body['id']
        name = body['name']
        Hero(id=id, name=name,).save()
        hero = json.dumps({"id":id, "name": name})
        return HttpResponse(hero)


def get_hero(request, id):
    if request.method == 'GET':
        hero = get_object_or_404(Hero, pk=id).get_objects()
        hero = json.dumps(hero)
        return HttpResponse(hero)
    if request.method == 'DELETE':
        Hero.objects.filter(pk=id).delete()

