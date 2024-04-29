import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../services/api.service';



@Component({
  selector: 'app-viewbookings',
  templateUrl: './viewbookings.component.html',
  styleUrls: ['./viewbookings.component.css']
})
export class ViewbookingsComponent {

res:any;


constructor(private ds:ApiService,private ar:ActivatedRoute){
  
  this.ar.params.subscribe((res:any)=>{
    this.res=this.ds.bookings(res.pk).then(res => res.json()).then((data:any)=>{
      this.res = data;
      console.log(this.res); // Move console log here
    })
    .catch(error => console.error(error));
  })
  
  }
  
}


