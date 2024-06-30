# Generated by Django 5.0.3 on 2024-06-27 12:22

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0032_feedbackmechanic_userpayment'),
    ]

    operations = [
        migrations.AlterField(
            model_name='userpayment',
            name='req',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='user_pay', to='api.reqtomechanic', unique=True),
        ),
    ]
