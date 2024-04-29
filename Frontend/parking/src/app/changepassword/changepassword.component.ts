import { Component } from '@angular/core';
import { ActivatedRoute, Router, } from '@angular/router';
import { ApiService } from '../services/api.service';
import { FormBuilder,FormGroup } from '@angular/forms';
import { Validators } from '@angular/forms';
@Component({
  selector: 'app-changepassword',
  templateUrl: './changepassword.component.html',
  styleUrls: ['./changepassword.component.css']
})
export class ChangepasswordComponent {



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
 