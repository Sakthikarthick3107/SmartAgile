# Generated by Django 5.0.4 on 2024-05-06 10:49

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('Users', '0002_userprofile'),
    ]

    operations = [
        migrations.AddField(
            model_name='user',
            name='image',
            field=models.ImageField(blank=True, null=True, upload_to='profile-image/'),
        ),
    ]
