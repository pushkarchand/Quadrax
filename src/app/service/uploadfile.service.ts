import { Router } from '@angular/router';
import { Http, RequestOptions, Headers } from '@angular/http';
import { Injectable } from '@angular/core';
// tslint:disable-next-line:import-blacklist
import { Observable } from 'rxjs';

@Injectable()
export class UploadfileService {

  constructor(private _http: Http) { }

  public uploadImage(fileToUpload: File): Observable<any> {
    const requestUrl = 'http://localhost:3000/uploadimage';
    const formData: FormData = new FormData();
    // fileToUpload.forEach(file => {
    formData.append('file', fileToUpload, fileToUpload.name);
    // })

    return this._http.post(requestUrl, formData)
      .map(() => {
         return true;
         })
      .catch((e) => this.handleError(e));
  }// public uploadImage(argFile: any): Observable<any>


  public uploadAllImages(argFiles: File[]): Observable<any> {
    const requestUrl = 'http://localhost:3000/uploadAllimage';
    const formData: FormData = new FormData();
    argFiles.forEach(file => {
      formData.append('file', file, file.name);
    });

    return this._http.post(requestUrl, formData)
      .map(() => {
         return true;
        })
      .catch((e) => this.handleError(e));
  }// public uploadAllImages(argFiles: File[]): Observable<any>

  private handleError(error) {
    let returnValue: any = '';
    returnValue = error;
    if (returnValue === undefined || returnValue === null) {
      const errorMessage = 'Error while connecting to the WEBAPI';
      return Observable.throw(errorMessage);
    } else {
      return Observable.throw(returnValue._body);
    }
  }// private handleError(error)

}
