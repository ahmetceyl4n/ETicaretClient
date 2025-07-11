import { Component } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { BaseComponent } from 'src/app/base/base.component';
import { Product } from 'src/app/contracts/product';
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

      this.httpClientService.get({
        controller: "products",
      }).subscribe(data => console.log(data));

      /* this.httpClientService.post({
        controller: "products",
      }, {
        name: "Kalem",
        price: 100,
        stock: 50,
        }).subscribe();
        this.httpClientService.post({
        controller: "products",
      }, {
        name: "Silgi",
        price: 50,
        stock: 200,
        }).subscribe(); */

        /* this.httpClientService.put({
          controller: "products",
        }, {
          id:"0197f904-5915-7f62-9b61-f6f1b8744370",
          name: "Top",
          price: 290,
          stock: 4000,
        }).subscribe(); */
        
        /*this.httpClientService.delete({
          controller: "products",
        }, "0197f904-5915-7f62-9b61-f6f1b8744370").subscribe(); */

        this.httpClientService.get<Product[]>({
          baseUrl: "https://jsonplaceholder.typicode.com",
          controller: "posts",
        }).subscribe(data => console.log(data));

  }
}
