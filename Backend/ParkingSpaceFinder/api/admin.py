from django.contrib import admin
from .models import *
# Register your models here.
from django.contrib.auth.admin import UserAdmin

class CustomUserAdmin(UserAdmin):
    # Define the fields to be displayed in the admin panel
    list_display = ['username', 'email','users']
    # Add any other customizations as needed

# Register the CustomUser model with the CustomUserAdmin
admin.site.register(User, UserAdmin)



admin.site.register(ReservedSlots)
admin.site.register(ReservedZones)
admin.site.register(ParkZone)
admin.site.register(State)
admin.site.register(District)
admin.site.register(Location)
admin.site.register(UserPayment)
