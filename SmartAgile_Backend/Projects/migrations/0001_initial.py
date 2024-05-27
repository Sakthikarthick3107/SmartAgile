# Generated by Django 5.0.1 on 2024-04-30 07:37

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('Organization', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='Projects',
            fields=[
                ('proj_id', models.AutoField(primary_key=True, serialize=False)),
                ('proj_name', models.CharField(max_length=100, unique=True)),
                ('proj_deadline', models.CharField(max_length=10)),
                ('proj_desc', models.CharField(max_length=255)),
                ('organization', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='organization_projects', to='Organization.organization')),
            ],
        ),
    ]
