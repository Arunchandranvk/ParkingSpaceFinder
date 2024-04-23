import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../services/api.service';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-changepassword',
  templateUrl: './changepassword.component.html',
  styleUrls: ['./changepassword.component.css']
})
export class ChangepasswordComponent {



 constructor(private fb:FormBuilder ,private ds:ApiService, private ar:ActivatedRoute , private rt:Router){}

  changepsForm=this.fb.group({
    old_password:'',
    new_password:'',
    confirm_password:''
  })

  change(){
    this.ds.changeps(this.changepsForm.value).then(res=>res.json()).then(data=>{
      console.log(data)
      if(this.changepsForm.valid){
        this.rt.navigate([''])
        alert("Change Password Successfully")
      }
      else{
      alert("Something Went Wrong !!!!")
      }
    })
  }

}
 