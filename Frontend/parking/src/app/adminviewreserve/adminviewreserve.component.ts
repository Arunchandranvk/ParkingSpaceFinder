import { Component } from '@angular/core';
import { ApiService } from '../services/api.service';
import { ActivatedRoute } from '@angular/router';



@Component({
  selector: 'app-adminviewreserve',
  templateUrl: './adminviewreserve.component.html',
  styleUrls: ['./adminviewreserve.component.css']
})
export class AdminviewreserveComponent {

resall:any;

constructor(private ds:ApiService,private ar:ActivatedRoute){
  this.ds.adminviewreserve().then(res=>res.json()).then(data=>this.resall=data)
  console.log(this.resall)
}




}
