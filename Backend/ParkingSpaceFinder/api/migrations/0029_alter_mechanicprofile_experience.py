# Generated by Django 5.0.3 on 2024-06-27 11:08

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0028_remove_mechanicprofile_skills'),
    ]

    operations = [
        migrations.AlterField(
            model_name='mechanicprofile',
            name='experience',
            field=models.IntegerField(),
        ),
    ]
