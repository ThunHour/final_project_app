
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { VehicleService } from 'src/app/service/vehicle.service';
import { VehicleDetail } from 'src/model/vehicle-detail';

@Component({
  selector: 'app-output',
  templateUrl: './output.component.html',
  styleUrls: ['./output.component.css']
})
export class OutputComponent implements OnInit {

  formValue !: FormGroup;
  constructor(private formbuilder: FormBuilder, private service: VehicleService, private router:Router) { }
  allRecord: any = [];
  btnSaveshow: boolean = true;
  recordInfo: VehicleDetail = new VehicleDetail();
  btnUpdateshow: boolean = false;
  ngOnInit(): void {
    this.formValue = this.formbuilder.group({
      id: [''],
      type: [''],
      model: [''],
      price: [''],
    })
    this.getRecord()
  }
  getRecord() {
    this.service.viewAllVehicles().subscribe(res => {
      this.allRecord = res;
    })
  }
  deleteVehicle(data: any) {
    this.service.deleteVehicle(data.id).subscribe({
      next: (v) => {
      },
      error: (e) => {
        alert(`Vehicle record id ${data.id} deleted successfully..!!!`)
        window.location.reload();
      },
    }
    )
  }
  edit(data: any) {
    this.formValue.controls["id"].setValue(data.id);
    this.formValue.controls["type"].setValue(data.type);
    this.formValue.controls["model"].setValue(data.model);
    this.formValue.controls["price"].setValue(data.price);
    this.UpdateShowBtn();
  }
  UpdateShowBtn() {
    this.btnUpdateshow = true;
    this.btnSaveshow = false;
  }
  SaveShowBtn() {
    this.btnUpdateshow = false;
    this.btnSaveshow = true;
  }
  update() {
    this.recordInfo.id = this.formValue.value.id;
    this.recordInfo.type = this.formValue.value.type;
    this.recordInfo.model = this.formValue.value.model;
    this.recordInfo.price = this.formValue.value.price;
    this.service.updatedVehicle(this.recordInfo).subscribe({
      next: (v) => {

      }, error: (e) => {
        window.location.reload();
      },
    })
  }
  AddMovie() { }
  deleteAll() {
    if (confirm('Are you sure you want to delete ALL')) {

      this.service.deleteAllVehicleRecords().subscribe({
        next: (v) => {
        },
        error: (e) => {
          window.location.reload();
          this.router.navigate(['output'])
        }
      }
      )
    }
  }
}
