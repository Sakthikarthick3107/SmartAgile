# Generated by Django 5.0.1 on 2024-06-19 03:57

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('Users', '0006_alter_userprofile_date_joined'),
    ]

    operations = [
        migrations.AddField(
            model_name='user',
            name='date_of_birth',
            field=models.DateField(null=True),
        ),
        migrations.AddField(
            model_name='user',
            name='emp_id',
            field=models.CharField(max_length=20, null=True),
        ),
    ]
