import { Component } from '@angular/core';
import { FormBuilder,Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../services/api.service';


@Component({
  selector: 'app-addparkzones',
  templateUrl: './addparkzones.component.html',
  styleUrls: ['./addparkzones.component.css']
})
export class AddparkzonesComponent {

  state:any;

  constructor(private fb:FormBuilder ,private ds:ApiService,private ar:ActivatedRoute,private rt:Router){
    this.ds.state().then(res=>res.json()).then(data=>this.state=data)
    console.log(this.state)
  }
  


  addparkzoneform = this.fb.group({
    name:'',
    total_slots:'',
    vacant_slots:'',
    occupied_slots:'',
    price:'',
    location:'',
    vehicle_type:'',
    state:'',
    district:''
  })


  addzone(){
    this.ds.addparkzone(this.addparkzoneform.value).then(res=>res.json()).then(data=>{
      console.log(data)
      if(this.addparkzoneform.valid){
        this.rt.navigate(['table'])
        alert('Parkzone Added Successfully')
      }
      else{
        alert('Something Went Wrong !!!!')
      }
    })
  }

}
