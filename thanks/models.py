from django.db import models


class Thanks(models.Model):
    title = models.CharField(max_length=50)
    content = models.TextField()
    name = models.CharField(max_length=512)
    email = models.EmailField(blank=True)
    repo = models.CharField(max_length=1024)
    project_url = models.URLField()
    likes = models.IntegerField(default=0)
    create_time = models.DateTimeField(auto_now_add=True)
    update_time = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.title

    class Meta:
        unique_together = ('repo', 'name',)
