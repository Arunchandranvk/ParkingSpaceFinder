import { Component } from '@angular/core';
import { ApiService } from '../services/api.service';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';


@Component({
  selector: 'app-payslip',
  templateUrl: './payslip.component.html',
  styleUrls: ['./payslip.component.css']
})
export class PayslipComponent {

resall:any;

  constructor(private ds:ApiService,private ar:ActivatedRoute,private fb:FormBuilder,private rt:Router){
  
    this.ds.paid().then(res=>res.json()).then(data=>this.resall=data)
    console.log(this.resall)



    }

}
