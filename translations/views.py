import json

from django.http import HttpResponse

# Create your views here.
from django.core import serializers
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt

from .models import Translation


# @csrf_exempt
def index(request):
    if request.method == "GET":
        data = serializers.serialize("json", Translation.objects.all())
        return HttpResponse(data, content_type='application/json')
    if request.method == "POST":
        # these two lines convert JSON into a Python dict
        # so we can further process the data
        body_unicode = request.body.decode('utf-8')
        body = json.loads(r'%s' % body_unicode)
        # print(body)
        if body["original_lang_text"] == "":
            return JsonResponse({"error": "Text field was left empty"}, status=422)
        if len(body["original_lang_text"]) > 500:
            return JsonResponse({"error": "Text must be under 500 characters"}, status=422)
        ###
        # create new event, convert request body dict into model properties,
        # and then save in db
        ###
        translation = Translation()
        translation.dict_to_class(body)
        translation.save()
        # Populate response dict because serializer only works on queryset
        response = {
            "original_lang_text": translation.original_lang_text,
            "original_lang": translation.original_lang,
            "eng_translation": translation.eng_translation
        }
        return JsonResponse(response)
