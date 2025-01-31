from django.contrib import admin
from api.models import User

class UserAdmin(admin.ModelAdmin):
    search_fields = ['email']

# Register your models here.
admin.site.register(User, UserAdmin)