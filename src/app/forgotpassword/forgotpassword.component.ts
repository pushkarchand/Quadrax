import { AuthenticationService } from './../service/authentication.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-forgotpassword',
  templateUrl: './forgotpassword.component.html',
  styleUrls: ['./forgotpassword.component.css'],
  providers: [AuthenticationService]
})
export class ForgotpasswordComponent implements OnInit {
  public emailId: string = "";
  public errormessage: string = "";
  public successmessage: string = "";
  constructor(private _router: ActivatedRoute, private _authService: AuthenticationService) { }

  ngOnInit() {
    this.emailId = this._router.snapshot.params['emailId'];
  }


  public sendConfirmationUrl(): void {
    this._authService.sendUrlForForgotPassword(this.emailId)
      .subscribe(response => {
        this.errormessage = "";
        this.successmessage = "Please check your email";
      }, error => {
        this.successmessage = "";
        this.errormessage = error;
      })
  }//public sendConfirmationUrl(): void

}
