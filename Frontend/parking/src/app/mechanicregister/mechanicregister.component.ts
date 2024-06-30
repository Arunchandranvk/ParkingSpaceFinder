import { Component } from '@angular/core';
import { FormBuilder,Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-mechanicregister',
  templateUrl: './mechanicregister.component.html',
  styleUrls: ['./mechanicregister.component.css']
})
export class MechanicregisterComponent {

  constructor(private fb:FormBuilder,private ds:ApiService,private ar:ActivatedRoute,private rt:Router){}

  regform = this.fb.group({
    first_name: ['', Validators.required], // Required validator for first name
    last_name: ['', Validators.required], // Required validator for last name
    email: ['', [Validators.required, Validators.email]], // Required and email validators for email
    username: ['', Validators.required], // Required validator for username
    password: ['', [Validators.required, Validators.minLength(8)]], // Required and minLength validators for password (at least 8 characters)
    dob: ['', Validators.required], // Required validator for date of birth
    gender: ['', Validators.required], // Required validator for gender
    address: ['', Validators.required], // Required validator for address
    phone_number: ['', [Validators.required, Validators.pattern(/^\d{10}$/)]], // Required and pattern validators for phone number (exactly 10 digits)
    profile_image: '', // No validation for profile image
  });
  
  registermech(){
    if (this.regform.valid) {
       this.ds.mechreg(this.regform.value).then(res=>res.json()).then(data=>{
      console.log(data);
        if (data && !data.data) {
          this.rt.navigate(['login']);
          alert('Registration Successful');
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

