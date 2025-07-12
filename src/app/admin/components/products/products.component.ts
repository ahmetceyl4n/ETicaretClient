import { Component } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { BaseComponent } from 'src/app/base/base.component';
import { Create_Product } from 'src/app/contracts/create_product';
import { HttpClientService } from 'src/app/services/common/http-client.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent extends BaseComponent {
  // Bu bileşen, BaseComponent'ten türetilmiştir ve temel işlevselliği devralır.
  // Ekstra özellikler veya metodlar eklenebilir

  constructor(spinner: NgxSpinnerService, private httpClientService: HttpClientService) {
      super(spinner);
      // BaseComponent'in constructor'ını çağırır

      

  }
}
