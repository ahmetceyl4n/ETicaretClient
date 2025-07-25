import { HttpErrorResponse } from '@angular/common/http';
import { Directive, ElementRef, EventEmitter, Host, HostListener, inject, Input, Output, Renderer2, signal } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { NgxSpinnerService } from 'ngx-spinner';
import { SpinnerType } from 'src/app/base/base.component';
import { DeleteDialogComponent, DeleteResult } from 'src/app/dialogs/delete-dialog/delete-dialog.component';
import { AlertifyService, MessaageType, Position } from 'src/app/services/admin/alertify.service';
import { HttpClientService } from 'src/app/services/common/http-client.service';
import { ProductService } from 'src/app/services/common/models/product.service';

declare var $: any;

@Directive({
  selector: '[appDelete]'
})
export class DeleteDirective {

  constructor(
    private element : ElementRef,
    private _renderer: Renderer2,
    private httpClientService: HttpClientService,
    private spinner: NgxSpinnerService,
    public dialog: MatDialog,
    private alertifyService: AlertifyService
  ) {
    const img = _renderer.createElement("img");
    img.setAttribute("src", "../assets/delete.png");
    img.setAttribute("style", "cursor: pointer;");
    img.width = 25;
    img.height = 25;

    _renderer.appendChild(element.nativeElement, img);
  }

  @Input() id: string;
  @Input() controller : string;

  @Output() callback : EventEmitter<any> = new EventEmitter();

  @HostListener("click") 
  async onClick() {
    this.openDialog(async () => {
      this.spinner.show(SpinnerType.SquareJellyBox);
      const td : HTMLTableCellElement = this.element.nativeElement;
      this.httpClientService.delete({
        controller: this.controller,
      }, this.id).subscribe(data => {
          $(td.parentElement)
          .animate({
            opacity: 0,
            left: "+=50",
            height: "toogle"
          }, 700, () => {
            this.callback.emit();
            this.alertifyService.message("Ürün başarıyla silindi", {
              dissmissOthers: true,
              messageType: MessaageType.Success,
              position: Position.TopRight  
            });
          });
        },(errorResponse: HttpErrorResponse) => {
          this.alertifyService.message("Ürün silinirken beklenmeyen bir hata oluştu", {
              dissmissOthers: true,
              messageType: MessaageType.Error,
              position: Position.TopRight  
            });
            this.spinner.hide(SpinnerType.SquareJellyBox);
        } );

      
      
    });
    
  }

  openDialog(afterClosed : any): void {
    const dialogRef = this.dialog.open(DeleteDialogComponent, {width: '250px', 
      
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === DeleteResult.Yes) {
        afterClosed();
      }
    });
  }
}


function model(arg0: string) {
  throw new Error('Function not implemented.');
}

