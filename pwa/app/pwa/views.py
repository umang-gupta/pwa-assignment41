from django.shortcuts import render
from django.http import HttpResponse

def index(request):
    return render(request,'index.html',{"name":"Aadarsh Kumar"})
# Create your views here.
