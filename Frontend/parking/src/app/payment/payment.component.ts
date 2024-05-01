import { Component } from '@angular/core';
import { FormBuilder,FormGroup } from '@angular/forms';
import { ApiService } from '../services/api.service';
import { Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent {
  paymentForm: FormGroup;
  res:any;
  data:any;

  constructor(private fb: FormBuilder, private ds: ApiService,private ar:ActivatedRoute,private rt:Router) {
   

    this.ar.params.subscribe((res:any)=>{
      this.data=this.ds.specific(res.pk).then(res => res.json()).then((data:any)=>{
        this.data = data;
        console.log(this.data); // Move console log here
      })
      .catch(error => console.error(error));
    })
    
    this.paymentForm = this.fb.group({
      cardnumber: ['', Validators.required],
      expirationDate: ['', Validators.required],
      cvv: ['', Validators.required],
     
    });
    }


  

  payments() {
    this.ar.params.subscribe((res: any) => {
      console.log("Form data:", this.paymentForm.value); // Log form data
      this.ds.payment(res.pk, this.paymentForm.value)
        .then((response: any) => response.json())
        .then((data: any) => {
          console.log(data);
            if (this.paymentForm.valid) {
              this.rt.navigate(['booked']);
              alert("Payment  Successful");
            } else {
              alert("Already Paid");
            }
        })
        .catch((error: any) => {
          console.error("Error occurred while reserving:", error);
          alert("An error occurred while processing your reservation. Please try again later.");
        });
    });
  }

}
