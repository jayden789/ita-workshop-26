from django.contrib import admin
from api.models import User
from django.apps import apps

class UserAdmin(admin.ModelAdmin):
    search_fields = ['email']

# Register your models here.
admin.site.register(User, UserAdmin)

app = apps.get_app_config('api')
for model in app.get_models():
    try:
        admin.site.register(model)
    except:
        pass