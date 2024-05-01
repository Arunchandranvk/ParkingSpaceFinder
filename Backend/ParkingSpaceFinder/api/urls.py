from django.urls import path , include
from .views import *
from rest_framework.authtoken.views import ObtainAuthToken
from django.conf import settings
from django.conf.urls.static import static
from rest_framework.routers import DefaultRouter
from drf_yasg.views import get_schema_view
from drf_yasg import openapi


schema_view = get_schema_view(
   openapi.Info(
      title="Parking Space Finder API",
      default_version='v1',
      description="Test description",
      terms_of_service="https://www.google.com/policies/terms/",
      contact=openapi.Contact(email="contact@snippets.local"),
      license=openapi.License(name="BSD License"),
   ),
   public=True,
   permission_classes=(permissions.AllowAny,),
)



router = DefaultRouter()
router.register(r'parkzones', ParkZoneViewSet),
# router.register(r'search', ParkingZoneSearchView, basename='parkingzone-search')



urlpatterns = [
    path('swagger<format>/', schema_view.without_ui(cache_timeout=0), name='schema-json'),
    path('swagger/', schema_view.with_ui('swagger', cache_timeout=0), name='schema-swagger-ui'),
    path('redoc/', schema_view.with_ui('redoc', cache_timeout=0), name='schema-redoc'),
    path("register/user/", UserRegistration.as_view(), name='user-register'), #completed
    path("register/admin", AdminRegistration.as_view(), name='admin-register'), #completed
    path('profile/<int:pk>/', UserUpdateProfile.as_view(), name='user-update_profile'),
    path('profiledmin/<int:pk>/', AdminUpdateProfile.as_view(), name='admin-update_profile'),
    path('token/', CustomAuthToken.as_view(), name='api_token_auth'), #completed
    path('reserve/<int:pk>/',ReservationView.as_view(),name='reservation'),
    path('cancel-reservation/<int:pk>/', CancelReservationView.as_view(), name='cancel_reservation'),
    path('search/',ParkZoneSearchView.as_view(),name='search'),
    path('ticket/',TicketPdfView.as_view(),name='ticket'),
    path('checkout/<int:pk>/', CheckOutView.as_view(), name='checkout'),
    path('checkin/<int:pk>/', CheckInView.as_view(), name='checkin'),
    path('change_password/', ChangePasswordView.as_view(), name='change-password'), #partially completed
    path('bookings/<int:pk>/reservations/', CurrentDayParkZoneReservationsAPIView.as_view(), name='list-reservations'),
    path('viewprofile/',ProfileView.as_view(),name='profile'), #completed
    path('states/',States.as_view(),name="state"),
    path('district/',Districts.as_view(),name="state"),
    path('location/',Locations.as_view(),name="state"),
    path('listparkzone/',ListParkzones.as_view(),name="all"), #completed
    path('reserved/',ReservedAll.as_view(),name="res"), #completed
    path('all/',ReservedAllBookings.as_view(),name="resall"), #completed
    path('slots/<int:pk>/',ReservationzoneSlotnumer.as_view(),name="ressolots"), #completed
    path('parkzone/<int:pk>/',ParkzonesView.as_view(),name="park"), #completed
    path('bookings/<int:pk>/',reserved.as_view(),name="book"), #completed
    path('userzones/',UserParkzones.as_view(),name="userzone"), #completed
    path('feed/<int:pk>/',FeedView.as_view(),name='f'),
    path('payment/<int:pk>/',PaymentView.as_view(),name='pay'),
    path('specific/<int:pk>/',reservedSpecific.as_view(),name='spec'),
    path('paid/',Paid.as_view(),name='p'),
    path('adminviewreserve/',AdminViewReservation.as_view(),name='reserve'),
    path('zoneupdate/<int:pk>/',ParkzoneUpdateProfile.as_view(),name='reserve'),
    path('',include(router.urls)) 
]


if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)

