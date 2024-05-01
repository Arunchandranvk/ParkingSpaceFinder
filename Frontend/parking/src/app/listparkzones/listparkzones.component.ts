import { Component } from '@angular/core';
import { ApiService } from '../services/api.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-listparkzones',
  templateUrl: './listparkzones.component.html',
  styleUrls: ['./listparkzones.component.css']
})
export class ListparkzonesComponent {

  zones:any;

constructor(private ds:ApiService,private ar:ActivatedRoute){

  this.ds.userparkzone().then(res=>res.json()).then(data=>this.zones=data)
  console.log(this.zones)
}



deletezone(pk:number) {
  this.ar.params.subscribe((res: any) => {
    this.ds.deleteparkzone(pk)
      .then((response: any) => response.json())
      .then((data: any) => {
        console.log(data);
        alert("Deleted successfully");
        window.location.reload();
      })
      .catch((error: any) => {
        console.error("Error occurred while reserving:", error);
        alert("An error occurred while processing your deletion. Please try again later.");
      });
  });
}
}
