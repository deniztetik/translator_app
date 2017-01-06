from datetime import datetime
from django.db import models
from googleapiclient.discovery import build
from .config import GOOGLE_TRANSLATE_API_KEY


service = build('translate', 'v2',
            developerKey=GOOGLE_TRANSLATE_API_KEY)

# Create your models here.
class Translation(models.Model):
    pub_date = models.DateTimeField('date created')
    original_lang_text = models.CharField(max_length=500)
    eng_translation = models.CharField(max_length=500)
    original_lang = models.CharField(max_length=500, default='es')

    def __str__(self):
        return str([self.original_lang_text, self.original_lang, self.eng_translation])

    def dict_to_class(self, req_body):
        self.pub_date = datetime.now()
        self.original_lang_text = req_body['original_lang_text']
        self.get_english_translation_and_source_language()

    # Sample Google Translate API Params
    # {
    #   'q': ['Dónde Está La Playa'],
    #   'target': 'en',
    # }
    def get_english_translation_and_source_language(self):
        # print(
        #     service.detections().list(
        #         q=[self.original_lang_text]
        #     ).execute()
        # )
        request = service.translations().list(
            target='en',
            q=[self.original_lang_text]
        ).execute()
        self.original_lang = request['translations'][0]['detectedSourceLanguage']
        self.eng_translation = request['translations'][0]['translatedText']
