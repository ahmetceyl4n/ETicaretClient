import { Component, EventEmitter, Output } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { BaseComponent, SpinnerType } from 'src/app/base/base.component';
import { Create_Product } from 'src/app/contracts/create_product';
import { AlertifyService, MessaageType, Position } from 'src/app/services/admin/alertify.service';
import { FileUploadOptions } from 'src/app/services/common/file-upload/file-upload.component';
import { ProductService } from 'src/app/services/common/models/product.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent extends BaseComponent {
  constructor(
    spinner: NgxSpinnerService,
    private productService: ProductService,
    private alertify: AlertifyService
  ) {
    super(spinner);
  }

  @Output() createdProduct: EventEmitter<Create_Product> = new EventEmitter<Create_Product>();

  @Output() fileUploadOptions : Partial<FileUploadOptions> ={
    controller: "products",
    action: "upload",
    explanation: "Lütfen ürün dosyalarını yükleyiniz.",
    isAdminPage: true,
    accept: ".png, .jpg, .jpeg"
  };
  
  


  create(name: HTMLInputElement, stock: HTMLInputElement, price: HTMLInputElement) {
    this.showSpinner(SpinnerType.SquareJellyBox);

    const product: Create_Product = {
      name: name.value,
      stock: parseInt(stock.value, 10),
      price: parseFloat(price.value)
    };

    this.productService.create(product, () => {
      this.hideSpinner(SpinnerType.SquareJellyBox);
      this.alertify.message("Ürün başarıyla eklendi.", {
        messageType: MessaageType.Success,
        position: Position.TopRight,
        dissmissOthers: true
      });
      this.createdProduct.emit(product);
    }, (errorMessage: string) => {
      this.hideSpinner(SpinnerType.SquareJellyBox);
      this.alertify.message(errorMessage, {
        messageType: MessaageType.Error,
        position: Position.TopRight,
        dissmissOthers: true
      });
    });
  }
}
