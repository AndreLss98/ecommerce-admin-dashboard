import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-history-logs-modal',
  templateUrl: './history-logs-modal.component.html',
  styleUrls: ['./history-logs-modal.component.scss']
})
export class HistoryLogsModalComponent implements OnInit {

  public logForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private dialogRef: MatDialogRef<any>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {
    this.logForm = formBuilder.group({
      version: [data.Version, [Validators.required, Validators.pattern(/[0-9]+\.[0-9]+\.[0-9]/), Validators.maxLength(20)]],
      logs: [data.metafields['history-log']? data.metafields['history-log'].value : '', []]
    });
  }

  ngOnInit(): void {

  }

  onSave() {
    return { ...this.logForm.value, id: this.data.ProductID }
  }
}
