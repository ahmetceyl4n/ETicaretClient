import { Component, Input } from '@angular/core';
import { NgxFileDropEntry } from 'ngx-file-drop';
import { HttpClientService } from '../http-client.service';
import { HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { AlertifyService, MessaageType, Position } from '../../admin/alertify.service';
import { CustomToastrService, ToastrMessaageType, ToastrPosition } from '../../ui/custom-toastr.service';
import { FileUploadDialogComponent } from 'src/app/dialogs/file-upload-dialog/file-upload-dialog.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.scss']
})
export class FileUploadComponent {
  constructor(
    private httpClientService: HttpClientService,
    private alertService: AlertifyService,
    private customToastrService: CustomToastrService,
    private dialog: MatDialog
  ) { }

    public files: NgxFileDropEntry[];
    @Input() options : Partial<FileUploadOptions>;

  public selectedFiles(files: NgxFileDropEntry[]) {
    this.files = files;

    const fileData : FormData = new FormData();

    for (const file of files) { 
      (file.fileEntry as FileSystemFileEntry).file(_file => {
        fileData.append(_file.name, _file, file.relativePath); 

      });
    }
    this.openDialog(() => {
      this.httpClientService.post({
      controller: this.options.controller,
      action: this.options.action,
      queryString: this.options.queryString,
      headers : new HttpHeaders({"responseType": "blob" }),
    },fileData).subscribe(data => {
      
      const message ="Dosyalar başarıyla yüklendi.";
      if(this.options.isAdminPage) {
        this.alertService.message(message, {
          messageType: MessaageType.Success,
          position: Position.TopRight,
          dissmissOthers : true
        }); 
      }
      else {
        this.customToastrService.message(message,"Başarılı" ,{
          messageType: ToastrMessaageType.Success,
          position: ToastrPosition.TopRight,
        });
        
      } 

    },(errorResponse :HttpErrorResponse) => {

      const message ="Dosyalar yüklenemedi.";
      if(this.options.isAdminPage) {
        this.alertService.message(message, {
          messageType: MessaageType.Error,
          position: Position.TopRight,
          dissmissOthers : true
        }); 
      }
      else {
        this.customToastrService.message(message,"Başarısız" ,{
          messageType: ToastrMessaageType.Success,
          position: ToastrPosition.TopRight,
        });
        
      } 
    });
    });

    
    
  }

  openDialog(afterClosed : any): void {
      const dialogRef = this.dialog.open(FileUploadDialogComponent, {width: '250px', 
        
      });
  
      dialogRef.afterClosed().subscribe(result => {
        if (result === FileUploadDialogState.Yes) {
          afterClosed();
        }
      });
    }
  

}

export class FileUploadOptions {

  controller?: string;
  action?: string;
  queryString?: string;
  explanation?: string;
  accept?: string;
  isAdminPage? : boolean = false;
}

export enum FileUploadDialogState { 
  Yes = "Yes",
  No = "No"
}

