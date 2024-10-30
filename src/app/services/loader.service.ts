import { Injectable } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';

@Injectable({
  providedIn: 'root'
})
export class LoaderService {
loaderRquestCount=0;
  constructor(private spinnerServices:NgxSpinnerService) { }

  loader(){
    this.loaderRquestCount++;
    this.spinnerServices.show(undefined,{
       type :"timer",
       bdColor : "rgba(255, 255, 255, 0)",
       color : "#333333",
       size:"medium"
    })
  }
  idel(){
    this.loaderRquestCount--;
    if(this.loaderRquestCount<=0){
      this.loaderRquestCount=0;
      this.spinnerServices.hide()
    }
  }
}
