from rest_framework import serializers
from datetime import datetime
from api.models import *
from django.core.validators import RegexValidator
from django.shortcuts import get_object_or_404


class CustomDateFormatField(serializers.DateField):
    def to_internal_value(self, value):
        try:
            date_object = datetime.strptime(value, '%d-%m-%Y').date()
            return date_object
        except ValueError:
            self.fail('invalid')

class AdminSerializers(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ["first_name", "last_name", "email", "username", "password", "dob", "gender", "address", "phone_number"]

    def create(self, validated_data):
        validated_data["is_staff"] = True
        user = User.objects.create_user(**validated_data)
        return user


class SerUser(serializers.ModelSerializer):
    class Meta:
        model=User
        fields = ["first_name", "last_name", "email", "username","dob", "gender", "address", "phone_number"]



class UserSerializers(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ["first_name", "last_name", "email", "username", "password", "dob", "gender", "address", "phone_number"]

    def create(self, validated_data):
        user = User.objects.create_user(**validated_data)
        return user


class ParkZoneSerializer(serializers.ModelSerializer):
    VEHICLE_CHOICES = (
        ('bike', 'Bike'),
        ('car', 'Car'),
        ('heavy', 'Heavy Vehicle')
    )

    state = serializers.CharField(source='state_id')
    district = serializers.CharField(source='district_id')
    location = serializers.CharField(source='location_id')
    vehicle_type = serializers.ChoiceField(choices=VEHICLE_CHOICES)

    class Meta:
        model = ParkZone
        exclude = ["owner",]

class ParkSerializer(serializers.ModelSerializer):
    state_name = serializers.ReadOnlyField(source='state.name')
    district_name = serializers.ReadOnlyField(source='district.name')
    location_name = serializers.ReadOnlyField(source='location.name')
    class Meta:
        model = ParkZone
        exclude =["owner"]


class ReservationSerializer(serializers.ModelSerializer):
    # VEHICLE_CHOICES = (
    #     ('bike', 'Bike'),
    #     ('car', 'Car'),
    #     ('heavy', 'Heavy Vehicle')
    # )

    # vehicle_type = serializers.ChoiceField(choices=VEHICLE_CHOICES)
    start_time = serializers.DateTimeField(format='%Y-%m-%d %H:%M:%S')
    end_time = serializers.DateTimeField(format='%Y-%m-%d %H:%M:%S')
    
    phone = serializers.CharField(validators=[RegexValidator(
        regex=r'^[0-9]+$',
        message='Phone number must contain only digits',
        code='invalid_phone_number'
    )])

    class Meta:
        model = ReservedSlots
        exclude = [ 'user', 'checkout','zone']

class ReservationSer(serializers.ModelSerializer):
    zone = serializers.CharField(source='zone.name')
    class Meta:
        model=ReservedSlots
        exclude=['user']

    def to_representation(self, instance):
        data = super().to_representation(instance)
        # Manipulate the data further if needed
        return data



class ChangePasswordSerializer(serializers.Serializer):
    old_password = serializers.CharField(required=True)
    new_password = serializers.CharField(required=True)
    confirm_password = serializers.CharField(required=True)

    def validate(self, data):
        if data.get('new_password') != data.get('confirm_password'):
            raise serializers.ValidationError("The new passwords do not match.")
        return data
    
class ParkZoneSearchSerializer(serializers.ModelSerializer):
    class Meta:
        model = ParkZone
        fields = ['name', 'price', 'location', 'vehicle_type', 'district', 'state']


class StateSer(serializers.ModelSerializer):
    class Meta:
        model = State
        fields =['name' ]

class SlotNumberSer(serializers.ModelSerializer):
    class Meta:
        model = ReservedZones
        fields =['slot']