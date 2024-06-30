from django.contrib import admin
from .models import *
# Register your models here.
from django.contrib.auth.admin import UserAdmin

class CustomUserAdmin(UserAdmin):
    # Define the fields to be displayed in the admin panel
<<<<<<< HEAD
    list_display = ['username', 'email','users']
    # Add any other customizations as needed

# Register the CustomUser model with the CustomUserAdmin
admin.site.register(User, UserAdmin)

=======
    list_display = ['username', 'email']
    # Add any other customizations as needed

# Register the CustomUser model with the CustomUserAdmin
admin.site.register(User, CustomUserAdmin)
>>>>>>> 3013a6ec7b86757a2cce745582668791614e3d97


admin.site.register(ReservedSlots)
admin.site.register(ReservedZones)
admin.site.register(ParkZone)
admin.site.register(State)
admin.site.register(District)
admin.site.register(Location)
<<<<<<< HEAD
admin.site.register(UserPayment)
=======
>>>>>>> 3013a6ec7b86757a2cce745582668791614e3d97
