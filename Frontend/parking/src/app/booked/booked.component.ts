import { Component} from '@angular/core';
import { ApiService } from '../services/api.service';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-booked',
  templateUrl: './booked.component.html',
  styleUrls: ['./booked.component.css']
})
export class BookedComponent {
 
resall:any;

constructor(private ds:ApiService,private ar:ActivatedRoute,private fb:FormBuilder,private rt:Router){
  
  this.ds.allreserved().then(res=>res.json()).then(data=>this.resall=data)
  console.log(this.resall)
  }



  checkouts(pk:number) {
    this.ar.params.subscribe((res: any) => {
      this.ds.checkout(pk)
        .then((response: any) => response.json())
        .then((data: any) => {
          console.log(data);
        })
        .catch((error: any) => {
          console.error("Error occurred while reserving:", error);
          alert("An error occurred while processing your reservation. Please try again later.");
        });
    });
  }

  cancelreserve(pk:number) {
    this.ar.params.subscribe((res: any) => {
      this.ds.cancel(pk)
        .then((response: any) => response.json())
        .then((data: any) => {
          console.log(data);
        })
        .catch((error: any) => {
          console.error("Error occurred while reserving:", error);
          alert("An error occurred while processing your reservation. Please try again later.");
        });
    });
  }


}
 


