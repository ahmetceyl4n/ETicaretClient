import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { NgxSpinnerService } from 'ngx-spinner';
import { BaseComponent, SpinnerType } from 'src/app/base/base.component';
import { List_Product } from 'src/app/contracts/list_product';
import { AlertifyService, MessaageType, Position } from 'src/app/services/admin/alertify.service';
import { ProductService } from 'src/app/services/common/models/product.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent extends BaseComponent implements OnInit {
  displayedColumns: string[] = ['name', 'price', 'stock', 'createdDate', 'updatedDate'];
  dataSource: MatTableDataSource<List_Product> = null;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(
    private productService: ProductService,
    spinner: NgxSpinnerService,
    private alertify: AlertifyService
  ) {
    super(spinner);
  }

  async ngOnInit(): Promise<void> {
    await this.getProducts();
  }

  async getProducts(){
    this.showSpinner(SpinnerType.SquareJellyBox);

    try {
      const products: {totalCount : number , products : List_Product[]} = await this.productService.read(this.paginator ? this.paginator.pageIndex : 0, this.paginator ? this.paginator.pageSize : 5,
        () => this.hideSpinner(SpinnerType.SquareJellyBox),
        (errorMessage: string) => {
          this.hideSpinner(SpinnerType.SquareJellyBox);
          this.alertify.message(errorMessage, {
            messageType: MessaageType.Error,
            position: Position.TopRight,
            dissmissOthers: true
          });
        }
      );
      this.dataSource = new MatTableDataSource<List_Product>(products.products);
      this.paginator.length = products.totalCount;
      
    } catch (error) {
      this.hideSpinner(SpinnerType.SquareJellyBox);
      this.alertify.message("Ürünler yüklenirken bir hata oluştu.", {
        messageType: MessaageType.Error,
        position: Position.TopRight,
        dissmissOthers: true
      });
    }
  }

  async pageChanged() {
    await this.getProducts();
  }
}