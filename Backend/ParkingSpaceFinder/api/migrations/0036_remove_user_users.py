# Generated by Django 5.0.3 on 2024-06-28 04:22

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0035_user_users'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='user',
            name='users',
        ),
    ]
