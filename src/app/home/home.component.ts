import { UploadfileService } from './../service/uploadfile.service';
import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: [UploadfileService]
})
export class HomeComponent implements OnInit {
  public files: any[] = [];
  public errormessage: string = "";
  public successmessage: string = "";
  constructor(private _uploadFile: UploadfileService) { }

  ngOnInit() {
  }


  public handleFileInput(argFileList: any[], argValue): void {
    console.log(argFileList);
    for (let i = 0; i < argFileList.length; i++) {
      this.files.push(argFileList[i]);
    }

  }//public handleFileInput(argFileList: any[], argValue): void 



  public Uploadfile(argFileIndex: number): void {
    this._uploadFile.uploadImage(this.files[argFileIndex])
      .subscribe(response => {
        console.log(response)
        this.errormessage = "";
        this.successmessage = "Successfully uploaded file";
      }, error => {
        console.log(error);
        this.successmessage = "";
        this.errormessage = error;
      })
  }//public Uploadfile(argFileIndex:number):void

  public UploadAllfile(): void {
    this._uploadFile.uploadAllImages(this.files)
      .subscribe(response => {
        console.log(response)
        this.errormessage = "";
        this.successmessage = "Successfully uploaded All file";
      }, error => {
        console.log(error);
        this.successmessage = "";
        this.errormessage = error;
      })
  }
}
