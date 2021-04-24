import { Component, ElementRef, Inject, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-history-logs-modal',
  templateUrl: './history-logs-modal.component.html',
  styleUrls: ['./history-logs-modal.component.scss']
})
export class HistoryLogsModalComponent implements OnInit {

  @ViewChild('dropZone', { static: true })
  private _dropzone: ElementRef;

  public logForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private dialogRef: MatDialogRef<any>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {
    this.logForm = formBuilder.group({
      version: [data.Version, [Validators.required, Validators.pattern(/[0-9]+\.[0-9]+\.[0-9]/), Validators.maxLength(20)]],
      logs: [data.metafields && data.metafields['history-log']? data.metafields['history-log'].value : '', []]
    });
  }

  ngOnInit(): void {

    console.log(this.data);

    setTimeout(() => {
      this._dropzone.nativeElement.addEventListener('drop', (event) => {
        event.preventDefault();
        console.log(event);
        event.target.classList.remove('dragging');
        event.target.classList.add('droped');
        this.uploadFile();
      });

      this._dropzone.nativeElement.addEventListener('dragenter', (event) => {
        event.preventDefault();
        event.target.classList.add('dragging');
        event.target.classList.remove('droped');
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

  uploadFile() {
    console.log(this._dropzone.nativeElement);
    setTimeout(() => {
      this._dropzone.nativeElement.classList.remove('droped');
      this._dropzone.nativeElement.classList.add('uploaded');
    }, 5000);
  }
}
