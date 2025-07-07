import { Component } from '@angular/core';
import { NgxSpinner, NgxSpinnerService } from 'ngx-spinner';
import { BaseComponent } from 'src/app/base/base.component';

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.scss']
})
export class CustomersComponent extends BaseComponent  {
  // Bu bileşen, BaseComponent'ten türetilmiştir ve temel işlevselliği devralır.
  // Ekstra özellikler veya metodlar eklenebilir

  constructor(spinner : NgxSpinnerService) {
    super(spinner);
    // BaseComponent'in constructor'ını çağırır
  } 

}
