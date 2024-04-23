import { Component } from '@angular/core';
import { ApiService } from '../services/api.service';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';





@Component({
  selector: 'app-myparkzone',
  templateUrl: './myparkzone.component.html',
  styleUrls: ['./myparkzone.component.css']
})
export class MyparkzoneComponent {

data:any
pk:any

  
constructor(private ds:ApiService,private ar:ActivatedRoute,private router:Router){



   this.ar.params.subscribe((res:any)=>{
  this.data=this.ds.parkzone(res.pk).then(res => res.json()).then((data:any)=>{
    this.data = data;
    console.log(this.data); // Move console log here
  })
  .catch(error => console.error(error));
})
}
}



