import { Component } from '@angular/core';
import { ApiService } from '../services/api.service';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css']
})
export class HistoryComponent {

res:any;
  constructor(private ds:ApiService,private ar:ActivatedRoute,private fb:FormBuilder,private rt:Router){
  
    this.ds.allreservedbooking().then(res=>res.json()).then(data=>this.res=data)
    console.log(this.res)
    }
}
