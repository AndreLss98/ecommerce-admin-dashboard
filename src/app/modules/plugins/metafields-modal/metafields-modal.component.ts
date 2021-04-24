import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { BundlesService } from '../../bundles/bundles.service';

import { t as typy } from 'typy';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-metafields-modal',
  templateUrl: './metafields-modal.component.html',
  styleUrls: ['./metafields-modal.component.scss']
})
export class MetafieldsModalComponent implements OnInit {

  readonly Typy = typy;

  public dataSource: MatTableDataSource<any>;
  displayedColumns: string[] = ['Resolution', 'Software'];

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private bundleService: BundlesService
  ) {
    this.dataSource = new MatTableDataSource(this.data);
  }

  ngOnInit(): void {
    this.bundleService.getPluginMetafields(this.data.productId).subscribe((response: any) => {
      this.data["aspect-ratios"] = response.body.find((metafield: any) => metafield.namespace === "aspect-ratios");
      this.data["requirements"] = response.body.find((metafield: any) => metafield.namespace === "requirements");
      this.dataSource = new MatTableDataSource([this.data]);
    });
  }
}
