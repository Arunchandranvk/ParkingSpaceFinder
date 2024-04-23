# Generated by Django 5.0.3 on 2024-04-15 11:55

import django.db.models.deletion
from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0007_alter_user_profile_image'),
    ]

    operations = [
        migrations.CreateModel(
            name='ReservedSlots',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('slot_number', models.CharField(max_length=10)),
                ('vehicle_numberplate', models.CharField(max_length=10)),
                ('phone', models.CharField(max_length=16)),
                ('booking_date', models.DateTimeField(auto_now_add=True)),
                ('start_time', models.DateTimeField()),
                ('end_time', models.DateTimeField()),
                ('checkout', models.BooleanField(default=False)),
                ('vehicle_type', models.CharField(choices=[('bike', 'Bike'), ('car', 'Car'), ('heavy', 'Heavy Vehicle')], max_length=100)),
                ('price', models.DecimalField(decimal_places=2, default=0.0, max_digits=10)),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
                ('zone', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='api.parkzone')),
            ],
            options={
                'ordering': ['-booking_date'],
            },
        ),
    ]
