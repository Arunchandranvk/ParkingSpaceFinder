# Generated by Django 5.0.3 on 2024-04-17 18:09

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0013_remove_reservedzones_checkout_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='reservedzones',
            name='slot',
            field=models.CharField(max_length=10),
        ),
    ]
