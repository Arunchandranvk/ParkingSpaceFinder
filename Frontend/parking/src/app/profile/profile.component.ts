import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../services/api.service';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent {

  pro:any;

constructor(private ds:ApiService){

  this.ds.profile().then(res=>res.json()).then(data=>this.pro=data)
  console.log(this.pro)
}
}
