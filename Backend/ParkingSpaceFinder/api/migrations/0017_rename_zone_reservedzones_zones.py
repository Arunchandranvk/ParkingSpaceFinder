# Generated by Django 5.0.3 on 2024-04-23 15:13

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0016_alter_reservedslots_checkin'),
    ]

    operations = [
        migrations.RenameField(
            model_name='reservedzones',
            old_name='zone',
            new_name='zones',
        ),
    ]
