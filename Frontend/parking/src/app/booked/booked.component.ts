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
  

  checkins(pk: number) {
    this.ar.params.subscribe((res: any) => {
      this.ds.checkin(pk)
        .then((response: any) => {
          if (response.ok) {
            return response.json();
          } else {
            throw new Error('Failed to check in');
          }
        })
        .then((data: any) => {
          console.log(data);
          alert(data.message);
          window.location.reload(); // Reload the page after successful check-in
        })
        .catch((error: any) => {
          console.error("Error occurred while check-in:", error);
          // Display appropriate error message based on error response status
          if (error.status === 400) {
            alert("Wait For Your Slot Time");
          } else {
            alert("An error occurred while processing your check-in. Please try again later.");
          }
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
 


