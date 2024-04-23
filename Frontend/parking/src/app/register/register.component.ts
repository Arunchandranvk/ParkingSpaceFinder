import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ApiService } from '../services/api.service';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
 

  constructor(private fb:FormBuilder,private ds:ApiService,private ar:ActivatedRoute,private rt:Router){ }

  regform = this.fb.group({//formGroup
    first_name: '',//formArray
    last_name: '',
    email: '',
    username: '',
    password: '',
    dob: '',
    gender: '',
    address: '',
    phone_number: '',
    profile_image:'',
  })
  
  register(){
    this.ds.reg(this.regform.value).then(res=>res.json()).then(data=>{
      console.log(data)
      if(this.regform.valid){
        this.rt.navigate(['login'])
        alert("Registration Successful")
      }
      else {
         alert("Something went wrong !!!!")
      }  
    })
  }   
}
