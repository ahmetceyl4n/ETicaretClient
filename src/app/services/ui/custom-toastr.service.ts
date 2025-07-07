import { Injectable } from '@angular/core';
import { ToastrModule, ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class CustomToastrService  {

  constructor(private toastr : ToastrService) { }

  message(message : string , title : string, toastrOptions : Partial<ToastrOptions> ) {
    this.toastr[toastrOptions.messageType](message, title, {
      positionClass: toastrOptions.position,}); 
  }

}
export class ToastrOptions {  
 
  messageType: ToastrMessaageType = ToastrMessaageType.Info;
  position?: ToastrPosition = ToastrPosition.Default;
}
export enum ToastrMessaageType {
  Success = 'success',
  Error = 'error',
  Warning = 'warning',
  Info = 'info',
}

export enum ToastrPosition {
  TopLeft = 'toast-top-left',
  TopRight = 'toast-top-right',
  BottomLeft = 'toast-bottom-left',
  BottomRight = 'toast-bottom-right',
  TopCenter = 'toast-top-center',
  BottomCenter = 'toast-bottom-center',
  TopFullWidth = 'toast-top-full-width',
  BottomFullWidth = 'toast-bottom-full-width',
  Default = 'toast-top-right'
}