from django.contrib import admin
from .models import *
# Register your models here.


admin.site.register(ReservedSlots)
admin.site.register(ReservedZones)
admin.site.register(ParkZone)
admin.site.register(State)
admin.site.register(District)
admin.site.register(Location)