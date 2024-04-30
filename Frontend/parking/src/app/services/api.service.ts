import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private baseUrl = 'http://127.0.0.1:8000';

  constructor(private http:HttpClient) { }

  //register api function
  reg(data:any){
    return fetch('http://127.0.0.1:8000/register/user',{
      method:'POST',
      body: JSON.stringify(data),
      headers:{
        'Content-type':'application/json; charset="UTF-8" ',
        'Authorization':`Token ${localStorage.getItem("token")}`
      }
    })
  }

  adminreg(data:any){
    return fetch('http://127.0.0.1:8000/register/admin',{
      method:'POST',
      body: JSON.stringify(data),
      headers:{
        'Content-type':'application/json; charset="UTF-8" ',
        'Authorization':`Token ${localStorage.getItem("token")}`
      }
    })
  }


  //login api function
  login(data:any){
    return fetch('http://127.0.0.1:8000/token/',{
      method:'POST',
      body: JSON.stringify(data),
      headers:{
        'Content-type':'application/json; charset="UTF-8" ',
      },
    })
  }

  profile(){
    return fetch('http://127.0.0.1:8000/viewprofile/',{
      method:'GET',
      headers:{
        'Content-type':'application/json; charset="UTF-8" ',
        'Authorization':`Token ${localStorage.getItem("token")}`
      }
    })
  }

  addparkzone(data:any){
    return fetch('http://127.0.0.1:8000/parkzones/',{
      method:'POST',
      body: JSON.stringify(data),
      headers:{
        'Content-type':'application/json; charset="UTF-8" ',
        'Authorization':`Token ${localStorage.getItem("token")}`
      }
    })
  }

  userparkzone(){
    return fetch('http://127.0.0.1:8000/userzones/',{
      method:'GET',
      headers:{
        'Content-type':'application/json; charset="UTF-8" ',
        'Authorization':`Token ${localStorage.getItem("token")}`
      }
    })
  }

  listparkzone(){
    return fetch('http://127.0.0.1:8000/listparkzone/',{
      method:'GET',
      headers:{
        'Content-type':'application/json; charset="UTF-8" ',
        'Authorization':`Token ${localStorage.getItem("token")}`
      }
    })
  }

  state(){
    return fetch('http://127.0.0.1:8000/states/',{
      method:'GET',
      headers:{
        'Content-type':'application/json; charset="UTF-8" ',
        'Authorization':`Token ${localStorage.getItem("token")}`
      }
    })
  }

  allreserved(){
    return fetch('http://127.0.0.1:8000/reserved/',{
      method:'GET',
      headers:{
        'Content-type':'application/json; charset="UTF-8" ',
        'Authorization':`Token ${localStorage.getItem("token")}`
      }
    })
  }

  paid(){
    return fetch('http://127.0.0.1:8000/paid/',{
      method:'GET',
      headers:{
        'Content-type':'application/json; charset="UTF-8" ',
        'Authorization':`Token ${localStorage.getItem("token")}`
      }
    })
  }

  adminviewreserve(){
    return fetch('http://127.0.0.1:8000/adminviewreserve/',{
      method:'GET',
      headers:{
        'Content-type':'application/json; charset="UTF-8" ',
        'Authorization':`Token ${localStorage.getItem("token")}`
      }
    })
  }

  allreservedbooking(){
    return fetch('http://127.0.0.1:8000/all/',{
      method:'GET',
      headers:{
        'Content-type':'application/json; charset="UTF-8" ',
        'Authorization':`Token ${localStorage.getItem("token")}`
      }
    })
  }

  parkzone(pk:any){
    return fetch(`http://127.0.0.1:8000/parkzone/${pk}/`,{
      method:'GET',
      headers:{
        'Content-type':'application/json; charset="UTF-8" ',
        'Authorization':`Token ${localStorage.getItem("token")}`
      }
    })
  }

  specific(pk:any){
    return fetch(`http://127.0.0.1:8000/specific/${pk}/`,{
      method:'GET',
      headers:{
        'Content-type':'application/json; charset="UTF-8" ',
        'Authorization':`Token ${localStorage.getItem("token")}`
      }
    })
  }




  changeps(data:any){
    return fetch('http://127.0.0.1:8000/change_password/',{
      method:'POST',
      body: JSON.stringify(data),
      headers:{
        'Content-type':'application/json',
        'Authorization':`Token ${localStorage.getItem("token")}`
      }
    })
  }
  
  reservation(pk:any,data:any){
    return fetch(`http://127.0.0.1:8000/reserve/${pk}/`,{
      method:'POST',
      body: JSON.stringify(data),
      headers:{
        'Content-type':'application/json; charset="UTF-8" ',
        'Authorization':`Token ${localStorage.getItem("token")}`
      }
    })
  }
  
  
  feedback(pk:any,data:any){
    return fetch(`http://127.0.0.1:8000/feed/${pk}/`,{
      method:'POST',
      body: JSON.stringify(data),
      headers:{
        'Content-type':'application/json; charset="UTF-8" ',
        'Authorization':`Token ${localStorage.getItem("token")}`
      }
    })
  }
  
  feedbackview(pk:any){
    return fetch(`http://127.0.0.1:8000/feed/${pk}/`,{
      method:'GET',
      headers:{
        'Content-type':'application/json; charset="UTF-8" ',
        'Authorization':`Token ${localStorage.getItem("token")}`
      }
    })
  }
  
  checkout(pk:any){
    return fetch(`http://127.0.0.1:8000/checkout/${pk}/`,{
      method:'POST',
      headers:{
        'Content-type':'application/json; charset="UTF-8" ',
        'Authorization':`Token ${localStorage.getItem("token")}`
      }
    })
  }
  
  checkin(pk:any){
    return fetch(`http://127.0.0.1:8000/checkin/${pk}/`,{
      method:'POST',
      headers:{
        'Content-type':'application/json; charset="UTF-8" ',
        'Authorization':`Token ${localStorage.getItem("token")}`
      }
    })
  }

  cancel(pk:any) {
    return fetch(`http://127.0.0.1:8000/cancel-reservation/${pk}/`, {
      method: 'DELETE',
      headers: {
        'Content-type': 'application/json; charset="UTF-8" ',
        'Authorization': `Token ${localStorage.getItem("token")}`
      }
    })
  }
  
  slots(pk:any){
    return fetch(`http://127.0.0.1:8000/slots/${pk}/`,{
      method:'GET',
      headers:{
        'Content-type':'application/json; charset="UTF-8" ',
        'Authorization':`Token ${localStorage.getItem("token")}`
      }
    })
  }

  searchParkZones(location: string, vehicle_type: string): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/search/?location=${location}&vehicle_type=${vehicle_type}`);
  }

  bookings(pk:any){
    return fetch(`http://127.0.0.1:8000/bookings/${pk}/`,{
      method:'GET',
      headers:{
        'Content-type':'application/json; charset="UTF-8" ',
        'Authorization':`Token ${localStorage.getItem("token")}`
      }
    })
  }
  currentdaybookings(pk:any){
    return fetch(`http://127.0.0.1:8000/bookings/${pk}/reservations/`,{
      method:'GET',
      headers:{
        'Content-type':'application/json; charset="UTF-8" ',
        'Authorization':`Token ${localStorage.getItem("token")}`
      }
    })
  }

  // searchParkZones(state: number, district: number, location: number, vehicleType: string): Observable<any> {
  //   const params = new HttpParams()
  //     .set('state', state.toString())
  //     .set('district', district.toString())
  //     .set('location', location.toString())
  //     .set('vehicle_type', vehicleType);

  //   return this.http.get<any>(`${this.baseUrl}/search/`, { params });
  // }

  payment(pk:any,data:any){
    return fetch(`http://127.0.0.1:8000/payment/${pk}/`,{
      method:'POST',
      body: JSON.stringify(data),
      headers:{
        'Content-type':'application/json; charset="UTF-8" ',
        'Authorization':`Token ${localStorage.getItem("token")}`
      }
    })
  }

}
































