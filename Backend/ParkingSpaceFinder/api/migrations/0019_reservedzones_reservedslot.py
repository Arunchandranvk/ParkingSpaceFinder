# Generated by Django 5.0.3 on 2024-04-23 15:52

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0018_rename_zones_reservedzones_zone'),
    ]

    operations = [
        migrations.AddField(
            model_name='reservedzones',
            name='ReservedSlot',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, to='api.reservedslots'),
        ),
    ]
