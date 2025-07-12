import { Component } from '@angular/core';
import { ProductService } from 'src/app/services/common/models/product.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent {
  constructor(private productService: ProductService) {}

  create(txtName,txtStock,txtPrice) {
    const product = {
      name: txtName.value,
      stock: parseInt(txtStock.value, 10),
      price: parseFloat(txtPrice.value)
    };

    this.productService.create(product);
  }


}
