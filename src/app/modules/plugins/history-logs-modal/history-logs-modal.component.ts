import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-history-logs-modal',
  templateUrl: './history-logs-modal.component.html',
  styleUrls: ['./history-logs-modal.component.scss']
})
export class HistoryLogsModalComponent implements OnInit {

  constructor(private dialogRef: MatDialogRef<any>) { }

  ngOnInit(): void {
    
  }

}
