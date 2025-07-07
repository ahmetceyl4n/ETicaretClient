import { Component } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { BaseComponent } from 'src/app/base/base.component';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent extends BaseComponent {
  // Bu bileşen, BaseComponent'ten türetilmiştir ve temel işlevselliği devralır.
  // Ekstra özellikler veya metodlar eklenebilir

  constructor(spinner: NgxSpinnerService) {
      super(spinner);
      // BaseComponent'in constructor'ını çağırır
    } 

}
