import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ApiService } from '../services/api.service';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';


@Component({
  selector: 'app-reservation',
  templateUrl: './reservation.component.html',
  styleUrls: ['./reservation.component.css']
})
export class ReservationComponent implements OnInit {

res:any
pk:any
data:any = { slots: [] };
selectedSlot: string = '';
numbersArray:any;
resall:any;
slots: any[] = [];
s:any;

constructor(private fb:FormBuilder,private ds:ApiService,private ar:ActivatedRoute,private rt:Router){ 
  this.ar.params.subscribe((res:any)=>{
    this.data=this.ds.parkzone(res.pk).then(res => res.json()).then((data:any)=>{
      this.data = data;
      console.log(this.data.vacant_slots); // Move console log here
      // console.log(this.data.vehicle_type); // Move console log here
    })
  });

}



ngOnInit(): void {
  this.ar.params.subscribe((res: any) => {
    this.ds.slots(res.pk).then(res => res.json()).then((data: any) => {
      this.slots = data;
      console.log(this.slots);
      // this.slots = this.generateRange(data.total_slots);
    })
  });
}


  reservationform = this.fb.group({
    slot_number: '',
    vehicle_numberplate: '',
    phone: '',
    start_time: '',
    end_time: '',
    
  })

  selectSlot(slot: any) {
    this.selectedSlot = slot.toString(); // Convert slot to string
    this.reservationform.patchValue({
      slot_number: slot.toString() // Update the form control with the selected slot number as string
    });
  }

 

  // Function to check if a slot is selected
  isSelected(slotNumber: string): boolean {
    return this.selectedSlot === slotNumber;
  }
  
  reserve() {
    this.ar.params.subscribe((res: any) => {
      console.log("Form data:", this.reservationform.value); // Log form data
      this.ds.reservation(res.pk, this.reservationform.value)
        .then((response: any) => response.json())
        .then((data: any) => {
          console.log(data);
          if (data.message === 'Successfully Booked') {
            if (this.reservationform.valid) {
              this.rt.navigate(['booked']);
              alert("Reservation Successful");
            } else {
              alert("You already have an active reservation");
            }
          } else {
            alert(data.message);
          }
        })
        .catch((error: any) => {
          console.error("Error occurred while reserving:", error);
          alert("An error occurred while processing your reservation. Please try again later.");
        });
    });
  }

  

  slotStatus = (slot: number): string => {
    const foundSlot = this.slots.find(s => s.slot == slot);
    return foundSlot ? 'occupied' : 'vacant';
  }
  
  generateRange(count: number): number[] {
    return Array.from({ length: count }, (_, i) => i + 1);
  }
                                                                                                           
  
}
