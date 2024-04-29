import { Component } from '@angular/core';
import { ApiService } from '../services/api.service';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-feedback',
  templateUrl: './feedback.component.html',
  styleUrls: ['./feedback.component.css']
})
export class FeedbackComponent {

  feed:any;

  constructor(private ds:ApiService,private fb:FormBuilder,private ar:ActivatedRoute,private rt:Router){
    this.ar.params.subscribe((res:any)=>{
      this.feed=this.ds.feedbackview(res.pk).then(res => res.json()).then((data:any)=>{
        this.feed = data;
        console.log(this.feed); // Move console log here
      })
      .catch(error => console.error(error));
    })
    }
  

  
feedform = this.fb.group({
  message:'',
 
});

feedbacks() {
  this.ar.params.subscribe((res: any) => {
    // console.log("Form data:", this.feedform.value); // Log form data
    this.ds.feedback(res.pk, this.feedform.value).then((response: any) => response.json())
      .then((data: any) => {
        console.log(data);
        // if (data.message === 'Feedback Added') {
          if (this.feedform.valid) {
            this.rt.navigate(['location']);
            alert("feedback Added  Successfully");
          } else {
            alert("You already have an active reservation");
          }
        // } else {
        //   alert(data.message);
        // }
      })
      .catch((error: any) => {
        console.error("Error occurred while reserving:", error);
        alert("An error occurred while processing your reservation. Please try again later.");
      });
  });

}


}
