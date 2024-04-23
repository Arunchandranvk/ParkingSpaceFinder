import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute ,Router} from '@angular/router';
import { ApiService } from '../services/api.service';


@Component({
  selector: 'app-adminlogin',
  templateUrl: './adminlogin.component.html',
  styleUrls: ['./adminlogin.component.css']
})
export class AdminloginComponent {
 
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
        localStorage.setItem('token',data['token']),
        this.rt.navigate(['table'])
        // console.log(this.log.value)
        alert("Login Successful")
      }
      else{
        alert("Username or Password Incorrect")
      }
    })
  }

}
