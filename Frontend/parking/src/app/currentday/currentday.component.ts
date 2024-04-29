import { Component } from '@angular/core';
import { ApiService } from '../services/api.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-currentday',
  templateUrl: './currentday.component.html',
  styleUrls: ['./currentday.component.css']
})
export class CurrentdayComponent {

res:any;

constructor(private ds:ApiService,private ar:ActivatedRoute){
  this.ar.params.subscribe((res:any)=>{
    this.res=this.ds.currentdaybookings(res.pk).then(res => res.json()).then((data:any)=>{
      this.res = data;
      console.log(this.res); // Move console log here
    })
    .catch(error => console.error(error));
  })
}


}
