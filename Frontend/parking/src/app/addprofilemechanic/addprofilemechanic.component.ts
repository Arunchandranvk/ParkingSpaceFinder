import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ApiService } from '../services/api.service';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-addprofilemechanic',
  templateUrl: './addprofilemechanic.component.html',
  styleUrls: ['./addprofilemechanic.component.css']
})
export class AddprofilemechanicComponent {
  loc: any;
  constructor(private fb:FormBuilder ,private ds:ApiService,private ar:ActivatedRoute,private rt:Router,private http:HttpClient){
    
  }

   ngOnInit() {
    this.fetchlocation();

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

    addprofileform = this.fb.group({
      name:'',
      location:'',
      phone:'',
      dob:'',
      experience:'',
      specialized_in:'',
      bio:'',
      profile_pic:'',
    })
  
    profileaddmech(){
      if (this.addprofileform.valid) {
        this.ds.mechprofileadd(this.addprofileform.value).then(res=>res.json()).then(data=>{
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
