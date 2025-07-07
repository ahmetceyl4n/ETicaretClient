import { Injectable } from '@angular/core';
declare var alertify: any;

@Injectable({
  providedIn: 'root'
})
export class AlertifyService {

  constructor() { }

  //message(message: string, messageType: MessaageType, position : Position = Position.TopCenter, delay : number = 3, dissmissOthers: boolean = false) {
  message(options: Partial<AlertifyOptions>) {
    alertify.set('notifier', 'position', options.position );
    alertify.set('notifier', 'delay', options.delay);
    alertify[options.messageType](options.message);
    if (options.dissmissOthers) {
      alertify.dismissAll();
    }
  }

  dissmiss() {
    alertify.dismissAll();
  }

}

export class AlertifyOptions {
  message: string ;
  messageType: MessaageType = MessaageType.Message;
  position?: Position = Position.TopCenter;
  delay?: number  = 3;
  dissmissOthers?: boolean  = false;
}

export enum MessaageType {
  Success = 'success',
  Error = 'error',
  Warning = 'warning',
  Message = 'message',
  Notify = 'notify'
}

export enum Position {
  TopCenter = 'top-center',
  TopRight = 'top-right',
  TopLeft = 'top-left',
  BottomCenter = 'bottom-center',
  BottomRight = 'bottom-right',
  BottomLeft = 'bottom-left'
}
