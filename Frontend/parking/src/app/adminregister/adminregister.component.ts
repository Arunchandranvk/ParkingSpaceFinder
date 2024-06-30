import { Component } from '@angular/core';
import { ApiService } from '../services/api.service';
import { FormBuilder,Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';


@Component({
  selector: 'app-adminregister',
  templateUrl: './adminregister.component.html',
  styleUrls: ['./adminregister.component.css']
})
export class AdminregisterComponent {

res:any;
  
  constructor(private fb:FormBuilder,private ds:ApiService,private ar:ActivatedRoute,private rt:Router){ }

  regform = this.fb.group({
    // Define your form controls with validations
    first_name: ['', Validators.required],
    last_name: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    username: ['', Validators.required],
    password: ['', [Validators.required, Validators.minLength(8)]],
    dob: ['', Validators.required],
    gender: ['', Validators.required],
    address: ['', Validators.required],
    phone_number: ['', [Validators.required, Validators.pattern('[0-9]*')]],
    profile_image: [''] // Assuming it's optional
  });

  
  register(){
    if (this.regform.valid) {
      this.ds.adminreg(this.regform.value).then(res=>res.json()).then(data=>{
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
