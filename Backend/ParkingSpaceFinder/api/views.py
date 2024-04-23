from rest_framework.generics import *
from rest_framework import viewsets
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .serializers import *
from api.permissions import *
from rest_framework.authentication import TokenAuthentication,BasicAuthentication
import random
import string
from django.utils import timezone
from django.db import transaction
from django.shortcuts import get_object_or_404
from django.contrib import messages
from django.db.models import Q
from django.core.exceptions import ObjectDoesNotExist
from django.http import Http404
from rest_framework.authtoken.views import ObtainAuthToken
from rest_framework.authtoken.models import Token
from rest_framework.response import Response
# Create your views here.


class CustomAuthToken(ObtainAuthToken):
    def post(self, request, *args, **kwargs):
        serializer = self.serializer_class(data=request.data,context={'request': request})
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data['user']
        token, created = Token.objects.get_or_create(user=user)
        users=User.objects.get(id=user.id)
        super=users.is_superuser
        
        return Response(data={'status':1,'token': token.key,
            'is_superuser':super
            })


class UserRegistration(APIView):
    def post(self, request):
        serializer = UserSerializers(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    

class AdminRegistration(APIView):
    def post(self, request, format=None):
        serializer = AdminSerializers(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
class ProfileView(APIView):
    def get(self,request):
        user=request.user.id
        data=User.objects.get(id=user)
        ser=SerUser(data)
        return Response(ser.data)

class UserUpdateProfile(APIView):
    authentication_classes = [BasicAuthentication, TokenAuthentication]
    def get_object(self,pk):
        try:
            return User.objects.get(pk=pk)
        except User.DoesNotExist:
            raise Http404

    def put(self, request, pk, format=None):
        profile = self.get_object(pk)
        serializer = UserSerializers(profile, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def patch(self, request, pk, format=None):
        profile = self.get_object(pk)
        serializer = UserSerializers(profile, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class AdminUpdateProfile(APIView):
    authentication_classes = [BasicAuthentication, TokenAuthentication]
    def get_object(self, pk):
        try:
            return User.objects.get(pk=pk)
        except User.DoesNotExist:
            raise Http404

    def put(self, request, pk, format=None):
        profile = self.get_object(pk)
        serializer = AdminSerializers(profile, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def patch(self, request, pk, format=None):
        profile = self.get_object(pk)
        serializer = AdminSerializers(profile, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class ParkZoneViewSet(viewsets.ModelViewSet):
    queryset = ParkZone.objects.all()
    serializer_class = ParkZoneSerializer
    # authentication_classes = [BasicAuthentication, TokenAuthentication]
    # permission_classes = [ permissions.IsAuthenticated]

    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)

    def get_queryset(self):
        user = self.request.user
        return ParkZone.objects.filter(owner=user)

    def create(self, request, *args, **kwargs):
        vehicle_type = request.data.get('vehicle_type')
        if vehicle_type not in ['bike', 'car', 'heavy']:
            return Response({"detail": "Invalid vehicle type"}, status=status.HTTP_400_BAD_REQUEST)
        return super().create(request, *args, **kwargs)

    # def update(self, request, *args, **kwargs):
    #     vehicle_type = request.data.get('vehicle_type')
    #     if vehicle_type not in ['bike', 'car', 'heavy']:
    #         return Response({"detail": "Invalid vehicle type"}, status=status.HTTP_400_BAD_REQUEST)
    #     return super().update(request, *args, **kwargs)

def create_ticket_code():
    return ''.join(random.choices(string.ascii_lowercase + string.digits, k=6))


class ReservationView(APIView):
    authentication_classes = [BasicAuthentication, TokenAuthentication]
    permission_classes = [permissions.IsAuthenticated]
    model = ReservedSlots
    serializer_class = ReservationSerializer

    def post(self, request, *args, **kwargs):
        pk = kwargs.get("pk")
        try:
            existing_reservation = self.model.objects.get(user=request.user,zone=pk, checkout=False)
            print(existing_reservation)
            return Response({'message': 'You already have an active reservation'}, status=status.HTTP_400_BAD_REQUEST)
        except self.model.DoesNotExist:
            pass  # User does not have an active reservation, continue with reservation creation

        
        serializer = self.serializer_class(data=request.data, context={'pk': pk})
        if serializer.is_valid():
            start_time = serializer.validated_data['start_time']
            end_time = serializer.validated_data['end_time']
            slot_number =  serializer.validated_data['slot_number']
            parking_zone_id = pk
            print(slot_number)
            if start_time >= end_time:
                return Response({'message': 'End time must be after start time'}, status=status.HTTP_400_BAD_REQUEST)

            if start_time <= timezone.now():
                return Response({'message': 'Reservation start time must be in the future'}, status=status.HTTP_400_BAD_REQUEST)

            parking_zone = get_object_or_404(ParkZone, id=parking_zone_id)
            if parking_zone.vacant_slots == 0:
                return Response({'message': 'Parking Zone Full!'}, status=status.HTTP_400_BAD_REQUEST)

            # Check if the parking zone is for the correct vehicle type
            # vehicle_type = serializer.validated_data.get('vehicle_type')
            # if vehicle_type != parking_zone.vehicle_type:
            #     return Response({'message': 'Invalid vehicle type for this parking zone'}, status=status.HTTP_400_BAD_REQUEST)

            ticket_code = create_ticket_code()
            while self.model.objects.filter(ticket_code=ticket_code).exists():
                ticket_code = create_ticket_code()

            total_hours = (end_time - start_time).total_seconds() / 3600
            total_price = total_hours * float(parking_zone.price)

            with transaction.atomic():
                reservation = serializer.save(user=request.user, zone=parking_zone, ticket_code=ticket_code, price=total_price , slot_number=slot_number)
                slot=ReservedZones.objects.create(zone=parking_zone,slot=slot_number)
                parking_zone.occupied_slots += 1
                parking_zone.vacant_slots = parking_zone.total_slots - parking_zone.occupied_slots
                parking_zone.save()

            return Response({'message': 'Successfully Booked', 'total_price': total_price}, status=status.HTTP_201_CREATED)
        print(serializer.errors)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    


class CancelReservationView(APIView):
    authentication_classes = [BasicAuthentication, TokenAuthentication]
    permission_classes = [permissions.IsAuthenticated]
    model = ReservedSlots

    def delete(self, request, pk, *args, **kwargs):
        try:
            print(request.user)
            print(pk)
            user_reservation = self.model.objects.get(user=request.user, pk=pk)
            print(user_reservation)
            if user_reservation.checkout:
                return Response({'message': 'Reservation has already been checked out'}, status=status.HTTP_400_BAD_REQUEST)
            parking_zone = user_reservation.zone
            with transaction.atomic():
                parking_zone.occupied_slots -= 1
                parking_zone.vacant_slots += 1
                parking_zone.save()
                user_reservation.delete()
            return Response({'message': 'Reservation deleted successfully'}, status=status.HTTP_204_NO_CONTENT)
        except self.model.DoesNotExist:
            return Response({'message': 'Reservation not found'}, status=status.HTTP_404_NOT_FOUND)

        
class ParkZoneSearchView(APIView):
    def get(self, request):
        state_id = request.query_params.get('state')
        district_id = request.query_params.get('district')
        location_id = request.query_params.get('location')
        vehicle_type = request.query_params.get('vehicle_type')

        if not all([state_id, district_id, location_id, vehicle_type]):
            return Response({'error': 'Please provide all search parameters.'}, status=400)

        try:
            zones = ParkZone.objects.filter(
                state_id=state_id,
                district_id=district_id,
                location_id=location_id,
                vehicle_type=vehicle_type
            )
        except ParkZone.DoesNotExist:
            return Response({'error': 'No matching ParkZone found.'}, status=404)

        serializer = ParkZoneSearchSerializer(zones, many=True)
        return Response(serializer.data)


    
class TicketPdfView(APIView): #parking history checkouted
    authentication_classes = [BasicAuthentication, TokenAuthentication]
    # permission_classes = [permissions.IsAuthenticated]

    def get(self, request):
        today = timezone.now()
        vehicle_type = request.GET.get('vehicle_type')
        reservations = ReservedSlots.objects.filter(user=request.user, checkout=True)
        if vehicle_type is not None:
            reservations = reservations.filter(vehicle_type=vehicle_type)
        if reservations.exists():
            data = {
                'today': today,
                'reservations': ReservationSerializer(reservations, many=True).data
            }
            return Response(data)
        else:
            message = f'No active parking reservations exist for {request.user}'
            return Response({'message': message}, status=status.HTTP_404_NOT_FOUND)
    





class CheckOutView(APIView):
    authentication_classes = [BasicAuthentication, TokenAuthentication]
    permission_classes = [permissions.IsAuthenticated]
    
    def post(self, request, **kwargs):
        pk=kwargs.get('pk')
        try:
            print(request.user.id)
            print(pk)
            reservation = ReservedSlots.objects.get(user=request.user.id, checkout=False, pk=pk)
            reserveslots = ReservedZones.objects.get(zone=reservation.zone)
            print(reservation)
            reservation.checkout = True
            reservation.save()

            parking_zone = reservation.zone
            parking_zone.occupied_slots -= 1

            parking_zone.vacant_slots += 1
            parking_zone.save()
             
            reserveslots.is_reserved = False
            reserveslots.save()

            return Response({'message': 'Successfully Checked Out'})
        except ReservedSlots.DoesNotExist:
            return Response({'message': f'No Parking reservation exists for {request.user} with ID {pk}'}, status=status.HTTP_404_NOT_FOUND)

class CheckInView(APIView):
    authentication_classes = [BasicAuthentication, TokenAuthentication]
    permission_classes = [permissions.IsAuthenticated]
    
    def post(self, request, **kwargs):
        pk=kwargs.get('pk')
        try:
            print(request.user.id)
            print(pk)
            reservation = ReservedSlots.objects.get(user=request.user.id, checkout=False, pk=pk)
            print(reservation)
            reservation.checkout = True
            reservation.save()

            parking_zone = reservation.zone
            parking_zone.occupied_slots -= 1

            parking_zone.vacant_slots += 1
            parking_zone.save()
             
            reserveslots.is_reserved = False
            reserveslots.save()

            return Response({'message': 'Successfully Checked Out'})
        except ReservedSlots.DoesNotExist:
            return Response({'message': f'No Parking reservation exists for {request.user} with ID {pk}'}, status=status.HTTP_404_NOT_FOUND)

class ChangePasswordView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request):
        serializer = ChangePasswordSerializer(data=request.data)
        if serializer.is_valid():
            if not request.user.check_password(serializer.data.get('old_password')):
                return Response({'old_password': ['Wrong password.']}, status=status.HTTP_400_BAD_REQUEST)
            request.user.set_password(serializer.data.get('new_password'))
            request.user.save()
            return Response({'message': 'Password changed successfully.'}, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    

class CurrentDayParkZoneReservationsAPIView(APIView):
    authentication_classes = [BasicAuthentication, TokenAuthentication]
    permission_classes = [permissions.IsAuthenticated]
    def get(self, request, pk):
        owner = request.user
        current_date = datetime.now().date()
        park_zone = get_object_or_404(ParkZone, pk=pk, owner=owner)
        reservations = ReservedSlots.objects.filter(zone=park_zone, start_time__date=current_date)
        serializer = ReservationSerializer(reservations, many=True)
        return Response(serializer.data)


class States(APIView):
    def get(self,request):
        data=State.objects.all()
        ser=StateSer(data,many=True)
        return Response(data={'status':1,'data':ser.data})

class ReservedAll(APIView):
    def get(self,request):
        user=request.user.id
        data=ReservedSlots.objects.filter(user=user,checkout=False)
        print(data)
        ser=ReservationSer(data,many=True)
        return Response(ser.data)

class ReservedAllBookings(APIView):
    def get(self,request):
        user=request.user.id
        data=ReservedSlots.objects.filter(user=user)
        print(data)
        ser=ReservationSer(data,many=True)
        return Response(ser.data)

class ListParkzones(APIView):
    def get(self,request):
        data=ParkZone.objects.all()
        ser=ParkSerializer(data,many=True)
        return Response(ser.data)

class ParkzonesView(APIView):
    def get(self,request,**kwargs):
        id=kwargs.get('pk')
        data=ParkZone.objects.get(id=id)
        ser=ParkSerializer(data)
        return Response(ser.data)

class ReservationzoneSlotnumer(APIView):
    def get(self,request,**kwargs):
        id=kwargs.get('pk')
        print(id)
        data=ReservedZones.objects.filter(zone=id)
        print(data)
        ser=SlotNumberSer(data,many=True)
        return Response(ser.data)