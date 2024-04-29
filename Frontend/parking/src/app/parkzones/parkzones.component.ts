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
  location: string = '';
  vehicle_type: string = '';
  parkZones: any[] = [];

  // stateId: any;
  // districtId: any;
  // locationId: any;
  // vehicleType: any;
  // parkZones: any;
  constructor(private ds:ApiService,private rt:Router){
  
    this.ds.listparkzone().then(res=>res.json()).then(data=>this.zones=data)
    console.log(this.zones)
  }
  search(): void {
    this.ds.searchParkZones(this.location, this.vehicle_type)
      .subscribe(data => {
        this.zones = data;
      });
  }
  // searchParkZones(): void {
  //   this.ds.searchParkZones(this.stateId, this.districtId, this.locationId, this.vehicleType)
  //     .subscribe(
  //       data => {
  //         this.parkZones = data;
  //       },
  //       error => {
  //         console.error(error);
  //         // Handle error
  //       }
  //     );
  // }
}
