import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
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
    return fetch('http://127.0.0.1:8000/parkzones/',{
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




  changeps(data:any){
    return fetch('http://127.0.0.1:8000/change-password/',{
      method:'POST',
      body: JSON.stringify(data),
      headers:{
        'Content-type':'application/json charset="UTF-8"',
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
  
  checkout(pk:any){
    return fetch(`http://127.0.0.1:8000/checkout/${pk}/`,{
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

}
































