import { Injectable } from '@angular/core';
declare var alertify: any;

@Injectable({
  providedIn: 'root'
})
export class AlertifyService {
  Position: any;
  MessaageType: any;
  success(arg0: string) {
    throw new Error('Method not implemented.');
  }

  constructor() { }

  //message(message: string, messageType: MessaageType, position : Position = Position.TopCenter, delay : number = 3, dissmissOthers: boolean = false) {
    message(message: string ,options: Partial<AlertifyOptions>) {
      const delay = options.delay !== undefined ? options.delay : 5;
      if(options.position)
        alertify.set('notifier', 'position', options.position );
      alertify.set('notifier', 'delay', delay);
      console.log('Alertify delay:', delay);
      if (options.dissmissOthers) {
        alertify.dismissAll();
      }
      alertify[options.messageType || 'message'](message);
    }

  dissmiss() {
    alertify.dismissAll();
  }

}

export class AlertifyOptions {
  
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
