from django.contrib import admin

from .models import Thanks


class ThanksAdmin(admin.ModelAdmin):
    list_display = ('title', 'name', 'repo', 'create_time',)
    search_fields = ['title', 'repo']
    list_filter = ('repo',)

admin.site.register(Thanks, ThanksAdmin)
