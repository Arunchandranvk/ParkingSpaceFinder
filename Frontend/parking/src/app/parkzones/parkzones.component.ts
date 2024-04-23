import { Component } from '@angular/core';
import { ApiService } from '../services/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-parkzones',
  templateUrl: './parkzones.component.html',
  styleUrls: ['./parkzones.component.css']
})
export class ParkzonesComponent {

  zones:any;

  constructor(private ds:ApiService,private rt:Router){
  
    this.ds.listparkzone().then(res=>res.json()).then(data=>this.zones=data)
    console.log(this.zones)
  }

  
}
