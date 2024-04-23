import { Component } from '@angular/core';
import { ApiService } from '../services/api.service';


@Component({
  selector: 'app-listparkzones',
  templateUrl: './listparkzones.component.html',
  styleUrls: ['./listparkzones.component.css']
})
export class ListparkzonesComponent {

  zones:any;

constructor(private ds:ApiService){

  this.ds.userparkzone().then(res=>res.json()).then(data=>this.zones=data)
  console.log(this.zones)
}

}
