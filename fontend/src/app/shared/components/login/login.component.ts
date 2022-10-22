import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { VehicleService } from 'src/app/service/vehicle.service';
import { DetailLogin } from 'src/model/detail-login';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  userLogin: DetailLogin = new DetailLogin();
  public loginForm !: FormGroup
  constructor(private formBuilder: FormBuilder, private http: HttpClient, private router: Router, private loginServer: VehicleService) { }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }
  async login() {
    this.userLogin.username = this.loginForm.value.username;
    this.userLogin.user_password = this.loginForm.value.password;
    const res = await this.loginServer.checkInDb(this.userLogin).toPromise().catch(() => {
      alert("Wrong on password or username")
      this.router.navigate(['login'])
      this.loginForm.reset();
    });
    const checkToken = await this.loginServer.verifyToken(res['token']).toPromise();
    if (checkToken == true) {
      this.router.navigate(['dashboard'])
      this.loginForm.reset();
    }
  }
 
}
