import { Component } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';


export class BaseComponent {

  constructor(private spinner : NgxSpinnerService) { }

  showSpinner(spinnerName : SpinnerType) {
    this.spinner.show(spinnerName );
    setTimeout(() => this.hideSpinner(spinnerName), 3000);

  }
  hideSpinner(spinnerName : SpinnerType) {
    this.spinner.hide(spinnerName);
  }
}

export enum SpinnerType {
  SquareJellyBox = 's1',
  BallSpinClockwiseFadeRotating = 's2',
  BallAtom = 's3',
  BallScaleMultiple = 's4',
}


