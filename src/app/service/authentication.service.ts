import { Router } from '@angular/router';
import { Http, RequestOptions, Headers } from '@angular/http';
import { Injectable } from '@angular/core';
// tslint:disable-next-line:import-blacklist
import { Observable } from 'rxjs';




@Injectable()
export class AuthenticationService {

  constructor(private _http: Http, private router: Router) { }

  public registerUser(argUserDetails: any): Observable<any> {
    const requestUrl = 'http://localhost:3000/user/signUp';

    const headers = new Headers({ 'Content-Type': 'application/json' });
    const options = new RequestOptions({ headers: headers });
    return this._http.post(requestUrl, argUserDetails, options)
      .map(res => {
        const customheaders = res.headers;
        const tokenResponse = customheaders.get('token');
        localStorage.setItem('token', tokenResponse);
        const returnValue = res.json();
        if (returnValue === true) {
          this.router.navigate(['/home']);
          return returnValue;
        } else {
          this.router.navigate(['/']);
          return false;
        }
      })
      .catch(this.handleError);
  }// public registerUser(argUserDetails: any): Observable<any>




  public userLogin(argLoginCredential: any): Observable<boolean> {
    const requestUrl = 'http://localhost:3000/user/login';

    const headers = new Headers({ 'Content-Type': 'application/json' });
    const options = new RequestOptions({ headers: headers });
    return this._http.post(requestUrl, argLoginCredential, options)
      .map(res => {
        const customHeaders = res.headers;
        const tokenResponse = customHeaders.get('token');
        localStorage.setItem('token', tokenResponse);
        const returnValue = res.json();
        if (returnValue === true) {
          this.router.navigate(['/home']);
          return returnValue;
        } else {
          this.router.navigate(['/']);
          return false;
        }
      })
      .catch(this.handleError);
  }// public userLogin(argLoginCredential: any): Observable<boolean>



  public sendUrlForForgotPassword(argEmailId: string): Observable<any> {
    const requestUrl: string = 'http://localhost:3000/user/forgotpassword/' + argEmailId;
    return this._http.get(requestUrl)
      .map(res => {
        return res;
      })
      .catch(this.handleError);
  }// public sendUrlForForgotPassword(argEmailId:string):Observable<any>




  private handleError(error) {
    let returnValue: any = '';
    returnValue = error;
    if (returnValue === undefined || returnValue == null) {
      const errorMessage = 'Error while connecting to the WEBAPI';
      return Observable.throw(errorMessage);
    } else {
      return Observable.throw(returnValue._body);
    }
  }// private handleError(error)



}
