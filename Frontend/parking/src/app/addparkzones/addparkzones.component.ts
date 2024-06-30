import { Component } from '@angular/core';
import { FormBuilder,Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../services/api.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-addparkzones',
  templateUrl: './addparkzones.component.html',
  styleUrls: ['./addparkzones.component.css']
})
export class AddparkzonesComponent  {

  states: any;
  loc: any;
  dist:any;


  constructor(private fb:FormBuilder ,private ds:ApiService,private ar:ActivatedRoute,private rt:Router,private http:HttpClient){
    
  }

   ngOnInit() {
    this.fetchStates();
    this.fetchlocation();
    this.fetchdistrict();
  }

  fetchStates() {
    this.http.get<any[]>('http://127.0.0.1:8000/states/')
      .subscribe(
        data => {
          this.states = data;
        },
        error => {
          console.error('Error fetching states:', error);
        }
      );
  }

   

  fetchlocation() {
    this.http.get<any[]>('http://127.0.0.1:8000/location/')
      .subscribe(
        data => {
          this.loc = data;
        },
        error => {
          console.error('Error fetching states:', error);
        }
      );
    }


  fetchdistrict() {
    this.http.get<any[]>('http://127.0.0.1:8000/district/')
      .subscribe(
        data => {
          this.dist = data;
        },
        error => {
          console.error('Error fetching states:', error);
        }
      );
    }




addparkzoneform = this.fb.group({
    name:'',
    total_slots:'',
    vacant_slots:'',
    occupied_slots:'',
    price:'',
    location:'',
    vehicle_type:'',
    state:'',
    district:''
  })

addzone(){
  if (this.addparkzoneform.valid) {
    this.ds.addparkzone(this.addparkzoneform.value).then(res=>res.json()).then(data=>{
   console.log(data);
     if (data && !data.data) {
       this.rt.navigate(['login']);
       alert('Profile Added Successfully');
     } else {
       alert('Something went wrong: ' + JSON.stringify(data.data));
     }
   }).catch(error => {
     alert('Something went wrong: ' + error.data);
   });
 } else {
   alert('Form is not valid. Please check the input fields.');
 }
}


}
