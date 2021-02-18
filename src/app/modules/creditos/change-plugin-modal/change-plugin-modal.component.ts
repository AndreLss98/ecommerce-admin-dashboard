import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { BundlesService } from '../../bundles/bundles.service';

@Component({
  selector: 'app-change-plugin-modal',
  templateUrl: './change-plugin-modal.component.html',
  styleUrls: ['./change-plugin-modal.component.scss']
})
export class ChangePluginModalComponent implements OnInit {

  public isLoading: boolean = true;
  public plugins: any[] = [];

  constructor(
    public dialogRef: MatDialogRef<any>,
    private bundleService: BundlesService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {

  }

  ngOnInit(): void {
    this.bundleService.getAllPlugins().subscribe(({ products }) => {
      this.plugins = products.filter(plugin => plugin.id !== parseInt(this.data.currentPlugin.ItemID) && !plugin.handle.includes('pack'));
      this.isLoading = false;
    }, (error) => {
      this.isLoading = false;
    }, () => {
      this.isLoading = false;
    });
  }

  public changePlugin(plugin) {
    this.dialogRef.close(plugin)
  }

}
