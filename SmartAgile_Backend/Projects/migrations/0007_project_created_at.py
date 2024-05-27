# Generated by Django 5.0.1 on 2024-05-23 07:39

import django.utils.timezone
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('Projects', '0006_alter_projectmembers_profile'),
    ]

    operations = [
        migrations.AddField(
            model_name='project',
            name='created_at',
            field=models.DateField(auto_now_add=True, default=django.utils.timezone.now),
            preserve_default=False,
        ),
    ]