import { Component } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { BaseComponent } from 'src/app/base/base.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent extends BaseComponent {
  // Bu bileşen, BaseComponent'ten türetilmiştir ve temel işlevselliği devralır.
  // Ekstra özellikler veya metodlar eklenebilir.

  constructor(spinner : NgxSpinnerService) {
    super(spinner);
  }

}
