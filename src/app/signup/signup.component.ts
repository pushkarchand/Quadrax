import { AuthenticationService } from './../service/authentication.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
  providers: [AuthenticationService]
})
export class SignupComponent implements OnInit {
  public errormessage: string = "";
  public form: FormGroup;
  public passwordMatching: boolean = true;
  constructor(private fb: FormBuilder, private _authzService: AuthenticationService) { }

  ngOnInit() {
    this.form = this.fb.group({
      name: ['', Validators.required],
      password: ['', Validators.required],
      emailAddress: ['', Validators.email],
      contactNumber: ['', Validators.required],
      confirm: ['', Validators.required]
    });
  }



  public signupUser() {
    this._authzService.registerUser(this.form.value)
      .subscribe(response => {
        console.log("Successfully Registed user");
      }, error => {
        this.errormessage = error;
      })
  }// public signupUser() {



  public handleChangeInPassword(): void {

  }//public handleChangeInPassword():void



}
