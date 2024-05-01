import { Component } from '@angular/core';
import { ApiService } from '../services/api.service';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { FormBuilder,Validators } from '@angular/forms';

@Component({
  selector: 'app-userchangepassword',
  templateUrl: './userchangepassword.component.html',
  styleUrls: ['./userchangepassword.component.css']
})
export class UserchangepasswordComponent {


  constructor(private fb:FormBuilder ,private ds:ApiService, private ar:ActivatedRoute , private rt:Router){}

  changepsForm = this.fb.group({
   old_password: ['', Validators.required],
   new_password: ['', [Validators.required, Validators.minLength(8)]],
   confirm_password: ['', Validators.required]
 });
 
 
 
 
   change() {
     this.ds.changeps(this.changepsForm.value)
       .then((res: any) => res.json())
       .then((data: any) => {
         console.log(data);
         if (data.message === 'Password changed successfully') {
           this.rt.navigate(['/']);
           alert('Change Password Successfully');
         } else {
           alert('Something Went Wrong !!!!');
         }
       })
       .catch((error: any) => {
         if (error && error.error && error.error.old_password) {
           alert(error.error.old_password[0]); // Display Django API validation error message
         } else {
           alert('An error occurred while processing your request. Please try again later.');
         }
       });
   }
   
 
 
  

}
