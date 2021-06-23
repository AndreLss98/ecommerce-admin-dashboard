import { HttpEvent, HttpEventType } from '@angular/common/http';
import { Component, ElementRef, Inject, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { PluginsService } from '../plugins.service';

@Component({
  selector: 'app-history-logs-modal',
  templateUrl: './history-logs-modal.component.html',
  styleUrls: ['./history-logs-modal.component.scss']
})
export class HistoryLogsModalComponent implements OnInit {
  
  @ViewChild('dropZone', { static: true })
  private _dropzone: ElementRef;

  public logForm: FormGroup;
  public progress = 0;

  constructor(
    private formBuilder: FormBuilder,
    private dialogRef: MatDialogRef<any>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private pluginsService: PluginsService
  ) {
    this.logForm = formBuilder.group({
      version: [data.Version, [Validators.required, Validators.pattern(/[0-9]+\.[0-9]+\.[0-9]/), Validators.maxLength(20)]],
      logs: [data.metafields && data.metafields['history-log']? data.metafields['history-log'].value : '', []],
    });
  }

  ngOnInit(): void {
    document.getElementById("progress").hidden = true;
    this.progress = 0;
    setTimeout(() => {
      this._dropzone.nativeElement.addEventListener('drop', (event) => {
        event.preventDefault();
        console.log(event.dataTransfer.files);
        event.target.classList.remove('dragging');
        event.target.classList.add('droped');
        this.uploadFile(event.dataTransfer.files[0]);
      });

      this._dropzone.nativeElement.addEventListener('dragenter', (event) => {
        event.preventDefault();
        event.target.classList.add('dragging');
        event.target.classList.remove('droped');
        event.target.classList.remove('error');
        this._dropzone.nativeElement.classList.remove('uploaded');
      });

      this._dropzone.nativeElement.addEventListener('dragover', (event) => {
        event.preventDefault();
      });

      this._dropzone.nativeElement.addEventListener('dragleave', (event) => {
        event.preventDefault();
        event.target.classList.remove('dragging');
        event.target.classList.remove('droped');  
      });
    })
  }

  onSave() {
    return { ...this.logForm.value, id: this.data.ProductID }
  }

  uploadFile(file: File) {
    this.pluginsService.uploadFile(this.data.ProductID, file).subscribe((event: HttpEvent<Object>) => {
      document.getElementById("progress").hidden = false;
      //HttpEventType
      if(event.type == HttpEventType.Response) {
        console.log("Upload Concluído")
      }else if(event.type == HttpEventType.UploadProgress) {
        const percentDone = Math.round((event.loaded * 100) / event.total);
        this.progress = percentDone;
      }

      if(this.progress == 100){
        this._dropzone.nativeElement.classList.add('uploaded');  
        this._dropzone.nativeElement.classList.remove('uploading'); 
      } else{
        this._dropzone.nativeElement.classList.add('uploading');
      }
      
    },
     (error) => {
      document.getElementById("progress").hidden = true;
      console.log(error);
      this._dropzone.nativeElement.classList.remove('droped');
      this._dropzone.nativeElement.classList.add('error');
    }, () => {
      this._dropzone.nativeElement.classList.remove('droped');
    });
  }
}
