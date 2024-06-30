from django.db import models
from django.contrib.auth.models import AbstractUser
from datetime import datetime
from django.utils.translation import gettext as _

# Create your models here.


class customDateField(models.DateField):
    def to_python(self, value):
        if isinstance(value, str):
            return datetime.strptime(value, '%d-%m-%Y').date()
        return super().to_python(value)


class User(AbstractUser):
    dob = models.CharField(max_length=20)
    GENDER_CHOICES = [
        ("Male", "Male"),
        ("Female", "Female"),
        ("Others", "Others"),
    ]
    gender = models.CharField(max_length=20, choices=GENDER_CHOICES, default="Others")
    address = models.CharField(max_length=200)
    phone_number = models.CharField(max_length=20)
    profile_image = models.FileField(upload_to='images/profile', default='images/profile/default.jpg', blank=True, null=True)

    def formatted_dob(self):
        return self.dob.strftime('%d-%m-%Y')



class State(models.Model):
    name = models.CharField(max_length=100)

    def __str__(self):
        return self.name

class District(models.Model):
    name = models.CharField(max_length=100)
    state = models.ForeignKey(State, on_delete=models.CASCADE)

    def __str__(self):
        return f"{self.name}, {self.state}"

class Location(models.Model):
    name = models.CharField(max_length=100)
    district = models.ForeignKey(District, on_delete=models.CASCADE)

    def __str__(self):
        return f"{self.name}, {self.district}"

class ParkZone(models.Model):
    VEHICLE_CHOICES = (
        ('bike', 'Bike'),
        ('car', 'Car'),
        ('heavy', 'Heavy Vehicle')
    )
    name = models.CharField(max_length=100)
    owner = models.ForeignKey(User, on_delete=models.CASCADE)
    total_slots = models.PositiveIntegerField()
    vacant_slots = models.PositiveIntegerField(default=0)
    occupied_slots = models.PositiveIntegerField(default=0)
    price = models.DecimalField(max_digits=10, decimal_places=2)
    state = models.ForeignKey(State, on_delete=models.CASCADE)
    district = models.ForeignKey(District, on_delete=models.CASCADE)
    location = models.ForeignKey(Location, on_delete=models.CASCADE)
    vehicle_type = models.CharField(max_length=10, choices=VEHICLE_CHOICES)

    def get_state_name(self):
        return self.state.name if self.state else None

    def get_district_name(self):
        return self.district.name if self.district else None

    def get_location_name(self):
        return self.location.name if self.location else None

    # def __str__(self):
    #     return f"{self.name} - {self.get_vehicle_type_display()},{self.location}, {self.district}, {self.state}"



# class Reservation(models.Model):
#     VEHICLE_CHOICES = (
#         ('bike', _('Bike')),
#         ('car', _('Car')),
#         ('heavy', _('Heavy Vehicle'))
#     )

#     ticket_code = models.CharField(max_length=6, blank=True, null=True)
#     customer = models.ForeignKey(User, on_delete=models.CASCADE)
#     start_time = models.DateTimeField()
#     finish_time = models.DateTimeField()
#     parking_zone = models.ForeignKey(ParkZone, on_delete=models.CASCADE)
#     plate_number = models.CharField(max_length=10)
#     phone_number = models.CharField(max_length=16)
#     checked_out = models.BooleanField(default=False)
#     created_on = models.DateTimeField(auto_now_add=True)
#     total_price = models.DecimalField(max_digits=10, decimal_places=2, default=0.0)
#     vehicle_type = models.CharField(_('Vehicle Type'), max_length=10, choices=VEHICLE_CHOICES)

#     class Meta:
#         ordering = ['-created_on']

#     def __str__(self):
#         return f'Reservation for vehicle: {self.plate_number}'
    


class ReservedSlots(models.Model):

    ticket_code = models.CharField(max_length=6, blank=True, null=True)
    user=models.ForeignKey(User,on_delete=models.CASCADE)
    zone=models.ForeignKey(ParkZone,on_delete=models.CASCADE)
    slot_number=models.CharField(max_length=10)
    vehicle_numberplate = models.CharField(max_length=10)
    phone = models.CharField(max_length=16)
    booking_date=models.DateTimeField(auto_now_add=True)
    start_time=models.DateTimeField()
    end_time=models.DateTimeField()
    checkin=models.BooleanField(default=False)
    checkout=models.BooleanField(default=False)
    price=models.DecimalField(max_digits=10, decimal_places=2, default=0.0)
    is_paid=models.BooleanField(default=False)
    class Meta:
        ordering = ['-booking_date']

    def __str__(self):
        return self.vehicle_numberplate
    


class ReservedZones(models.Model):
    ReservedSlot=models.ForeignKey(ReservedSlots,on_delete=models.CASCADE,null=True)
    zone=models.ForeignKey(ParkZone,on_delete=models.CASCADE)
    slot=models.CharField(max_length=10)
    is_reserved=models.BooleanField(default=True)
    date=models.DateTimeField(null=True)

    # checkout=models.BooleanField(default=False)

class Feedback(models.Model):
    message=models.TextField()
    user=models.ForeignKey(User,on_delete=models.CASCADE)
    zone=models.ForeignKey(ParkZone,on_delete=models.CASCADE)

    def get_user_name(self):
        return self.user.username if self.user else None
    

class Payment(models.Model):
    cardnumber=models.IntegerField()
    expirationDate=models.CharField(max_length=10)
    cvv=models.IntegerField()
    amount=models.CharField(max_length=100)
    user=models.ForeignKey(User,on_delete=models.CASCADE)
    slot=models.ForeignKey(ReservedSlots,on_delete=models.CASCADE)

class MechanicProfile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name="mechanic_profile")
    name=models.CharField(max_length=100)
    location = models.ForeignKey(Location, on_delete=models.CASCADE, related_name="mechanic_location")
    phone = models.CharField(max_length=200)
    dob = models.DateField(null=True)
    experience = models.IntegerField()
    STATUS_CHOICES = [
        ("approved", "Approved"),
        ("pending", "Pending"),
    ]
    status = models.CharField(max_length=200, choices=STATUS_CHOICES, default="pending")
    SPECIALIZATION_CHOICES = [
        ("two_wheeler", "Two Wheeler"),
        ("four_wheeler", "Four Wheeler"),
        ("heavy_vehicle", "Heavy Vehicle"),
    ]
    specialized_in = models.CharField(max_length=200, choices=SPECIALIZATION_CHOICES)
    bio = models.CharField(max_length=200)
    profile_pic = models.ImageField(upload_to="mech_pics",default='static/images/profile/default.jpg', blank=True, null=True)

    def __str__(self):
        return self.user.username
    

class ReqToMechanic(models.Model):
    user=models.ForeignKey(User,on_delete=models.CASCADE,related_name="req_profile")
    mechanic=models.ForeignKey(MechanicProfile,on_delete=models.CASCADE,related_name="req_profile")
    description=models.CharField(max_length=200)
    phone=models.IntegerField()
    location=models.ForeignKey(Location,on_delete=models.CASCADE,related_name="req_location")
    STATUS_CHOICES = [
        ("completed", "Completed"),
        ("Payment Pending", "Payment Pending"),
        ("pending", "Pending"),
    ]
    status = models.CharField(max_length=200, choices=STATUS_CHOICES, default="pending")
    datetime=models.DateTimeField(auto_now_add=True,null=True)


class Bill(models.Model):
    customer=models.ForeignKey(User,on_delete=models.CASCADE)
    mechanic=models.ForeignKey(MechanicProfile,on_delete=models.CASCADE)
    req=models.ForeignKey(ReqToMechanic,on_delete=models.CASCADE)
    payment=models.PositiveBigIntegerField()
    # STATUS_CHOICES = [
    #     ("completed", "Completed"),
    #     ("pending", "Pending"),
    # ]
    # status = models.CharField(max_length=200, choices=STATUS_CHOICES, default="pending")


class UserPayment(models.Model):
    customer=models.ForeignKey(User,on_delete=models.CASCADE,related_name='cust_pay')
    mechanic=models.ForeignKey(MechanicProfile,on_delete=models.CASCADE,related_name='mech_pay')
    req=models.OneToOneField(ReqToMechanic,on_delete=models.CASCADE,related_name='user_pay')
    acholdername=models.CharField(max_length=100)
    accno=models.PositiveBigIntegerField()
    cvv=models.IntegerField()
    exp=models.DateField()
    amount=models.PositiveBigIntegerField()
    
    def __str__(self):
        return self.acholdername


class FeedBackMechanic(models.Model):
    user=models.ForeignKey(User,on_delete=models.CASCADE,related_name="feedback_userprofile")
    request=models.ForeignKey(ReqToMechanic,on_delete=models.CASCADE,related_name="feedback_req",null=True)
    mechanic=models.ForeignKey(MechanicProfile,on_delete=models.CASCADE,related_name="feedback_mechanicprofile")
    text=models.CharField(max_length=200)
    options=(
        ("1","1"),
        ("2","2"),
        ("3","3"),
        ("4","4"),
        ("5","5"),
    )
    rating=models.CharField(max_length=200,choices=options,default="5")
    date=models.DateTimeField(auto_now_add=True)