import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ApiService } from '../services/api.service';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  log=this.fb.group({
    'username':['',[Validators.required,Validators.pattern("[a-zA-Z0-9]+")]],
    'password':['',[Validators.required,Validators.minLength(3)]],
    
  })
  
  
  constructor(private fb:FormBuilder,private ds:ApiService,private rt:Router,private ar:ActivatedRoute){
   
  }
  

  Clicked(e:any){
    this.ds.login(this.log.value).then(res=>res.json()).then(data=>{
      console.log(data)
      if(data["token"]){
        localStorage.setItem('token',data['token']);
        if (data["is_superuser"] == true ) {
          this.rt.navigate(['table']); // Navigate to admin dashboard if user is a superuser
        } else {
          this.rt.navigate(['location']); // Navigate to regular user dashboard if user is not a superuser
        }
        // this.rt.navigate(['location'])
        // // console.log(this.log.value)
        alert("Login Successful")
      }
      else{
        alert("Username or Password Incorrect")
      }
    })
  }
}


