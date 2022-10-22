import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { VehicleService } from 'src/app/service/vehicle.service';
import { DetailLogin } from 'src/model/detail-login';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {

  public signupForm !: FormGroup;
  constructor(private formBuilder: FormBuilder, private http: HttpClient, private router: Router, private loginServer: VehicleService) { }
  userLogin: DetailLogin = new DetailLogin();
  ngOnInit() {
    this.signupForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }
  async signUp() {
    this.userLogin.username = this.signupForm.value.username;
    this.userLogin.user_password = this.signupForm.value.password;
    const signRes = await this.loginServer.signup(this.userLogin).toPromise().catch(() => {
      alert("Wrong on password or username")
      this.router.navigate(['login'])
      this.signupForm.reset();
    });
    const checkTokenSignUp = await this.loginServer.verifyToken(signRes['token']).toPromise();
    if (checkTokenSignUp == true) {
      this.router.navigate(['dashboard'])
      this.signupForm.reset();
    }
  }
}
