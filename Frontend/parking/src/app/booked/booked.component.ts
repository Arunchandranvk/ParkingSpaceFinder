import { Component} from '@angular/core';
import { ApiService } from '../services/api.service';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
// import { FormBuilder } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
// import Razorpay from 'razorpay';



@Component({
  selector: 'app-booked',
  templateUrl: './booked.component.html',
  styleUrls: ['./booked.component.css']
})
export class BookedComponent {
 
resall:any;
amount: number = 100; // Amount in paisa
razorpayApiKey: string = 'YOUR_RAZORPAY_API_KEY'; // Replace with a dummy API key


constructor(private ds:ApiService,private ar:ActivatedRoute,private fb:FormBuilder,private rt:Router){
  
  this.ds.allreserved().then(res=>res.json()).then(data=>this.resall=data)
  console.log(this.resall)
  }




  checkouts(pk:number) {
    this.ar.params.subscribe((res: any) => {
      this.ds.checkout(pk)
        .then((response: any) => response.json())
        .then((data: any) => {
          console.log(data); // Optional: Log the response data
          alert("Checkout successful!");
          window.location.reload(); // Alert after successful checkout
        })
        .catch((error: any) => {
          console.error("Error occurred while reserving:", error);
          alert("An error occurred while processing your reservation. Please try again later.");
        });
    });
  }
  

  checkins(pk:number) {
    this.ar.params.subscribe((res: any) => {
      this.ds.checkin(pk)
        .then((response: any) => response.json())
        .then((data: any) => {
          console.log(data);
          alert("Check-In successful!");
          window.location.reload();
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
          alert("Canceled successful!");
          window.location.reload();
        })
        .catch((error: any) => {
          console.error("Error occurred while reserving:", error);
          alert("An error occurred while processing your reservation. Please try again later.");
        });
    });
  }


}
 


