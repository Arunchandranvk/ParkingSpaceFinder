import { Component , OnInit} from '@angular/core';
import { ApiService } from '../services/api.service';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder,FormGroup } from '@angular/forms';
import { Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-updateparkzones',
  templateUrl: './updateparkzones.component.html',
  styleUrls: ['./updateparkzones.component.css']
})
export class UpdateparkzonesComponent implements OnInit {

  pk: any; // Update with the park zone ID you want to update
  formData: FormGroup;

  constructor(private ds: ApiService, private ar: ActivatedRoute, private fb: FormBuilder,private rt:Router) { 
    this.formData = this.fb.group({
      name: ['', Validators.required],
      total_slots: ['', Validators.required],
      vacant_slots: ['', Validators.required],
      occupied_slots: ['', Validators.required],
      price: ['', Validators.required],
      location: ['', Validators.required],
      vehicle_type: ['', Validators.required],
      state: ['', Validators.required],
      district: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.ar.params.subscribe((params: any) => {
      this.pk = params.pk;
    });
  }

  updatezone() {
    console.log("Form data:", this.formData.value); // Log form data
    this.ds.updateparkzone(this.pk, this.formData.value)
      .then((response: any) => response.json())
      .then((data: any) => {
        console.log(data);
        this.rt.navigate(['listparkzone']);
      })
      .catch((error: any) => {
        console.error("Error occurred while updating:", error);
        alert("An error occurred while processing your updation. Please try again later.");
      });
  }

}


