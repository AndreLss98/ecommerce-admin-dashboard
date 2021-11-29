import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';

import { t as typy } from 'typy';

import { PluginsService } from '../plugins.service';

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
    private pluginsService: PluginsService
  ) {
    this.dataSource = new MatTableDataSource(this.data);
  }

  ngOnInit(): void {
    this.pluginsService.getPluginMetafields(this.data.productId).subscribe((response: any) => {
      this.data["aspect-ratios"] = response.body.find((metafield: any) => metafield.namespace === "aspect-ratios");
      this.data["requirements"] = response.body.find((metafield: any) => metafield.namespace === "requirements");
      this.dataSource = new MatTableDataSource([this.data]);
    });
  }
}
