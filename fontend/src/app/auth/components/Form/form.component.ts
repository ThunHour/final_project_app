import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { VehicleService } from 'src/app/service/vehicle.service';
import { VehicleDetail } from 'src/model/vehicle-detail';


@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {

  vehicleForm !: FormGroup;
  constructor(private formbuilder: FormBuilder, private http: HttpClient, private router: Router, private service: VehicleService) { }
  ngOnInit(): void {
    this.vehicleForm = this.formbuilder.group({
      id: ['', Validators.required],
      type: ['', Validators.required],
      model: ['', Validators.required],
      price: ['', Validators.required],

    })

  }
  vehicleInfo: VehicleDetail = new VehicleDetail();
  insert() {
    if (this.vehicleForm.value.id == 0 || this.vehicleForm.value.price == 0 || this.vehicleForm.value.type == '' || this.vehicleForm.value.model == '') {
      alert("Fields can't be empty.");
    }
    this.vehicleInfo.id = this.vehicleForm.value.id
    this.vehicleInfo.type = this.vehicleForm.value.type
    this.vehicleInfo.model = this.vehicleForm.value.model
    this.vehicleInfo.price = this.vehicleForm.value.price
    this.service.addVehicle(this.vehicleInfo).subscribe({
      next: (res) => { }, error: (e) => {
        window.location.reload();
      }
    }
    )
  }
}
