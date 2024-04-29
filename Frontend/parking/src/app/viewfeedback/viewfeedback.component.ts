import { Component } from '@angular/core';
import { ApiService } from '../services/api.service';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';

@Component({
  selector: 'app-viewfeedback',
  templateUrl: './viewfeedback.component.html',
  styleUrls: ['./viewfeedback.component.css']
})
export class ViewfeedbackComponent {


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
}
