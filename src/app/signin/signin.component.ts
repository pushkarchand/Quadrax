import { Component, OnInit } from '@angular/core';
import { Router, RouterEvent, NavigationStart } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthenticationService } from '../service/authentication.service';
import { ConfigService } from '../service/config.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css'],
  providers: [AuthenticationService]
})
export class SigninComponent implements OnInit {
  public errormessage: string;

  public company: string;
  form: FormGroup;
  constructor(private _router: Router, private fb: FormBuilder,
    private _authzService: AuthenticationService, private configService: ConfigService) { }

  ngOnInit() {
    this.errormessage = '';
    this.company = this.configService.getCurrentSubDomain();
    this.form = this.fb.group({
      emailId: ['', Validators.required],
      password: ['', Validators.required]
    });
  }




  public loginUser() {
    this._authzService.userLogin(this.form.value)
      .subscribe(response => {
        console.log('Successfully signed in');
      }, error => {
        this.errormessage = error;
      });
  }// public loginUser()


  public userForgotPassword(): void {
    this._router.navigate(['/forgotpassword', this.form.value.emailId]);
  }// public userForgotPassword():void


}
