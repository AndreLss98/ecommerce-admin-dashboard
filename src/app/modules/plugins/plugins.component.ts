import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Component, OnInit, ViewChild } from '@angular/core';

import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

import { BundlesService } from '../bundles/bundles.service';

import { t as typy } from 'typy';
import { MatDialog } from '@angular/material/dialog';
import { HistoryLogsModalComponent } from './history-logs-modal/history-logs-modal.component';

@Component({
  selector: 'app-plugins',
  templateUrl: './plugins.component.html',
  styleUrls: ['./plugins.component.scss']
})
export class PluginsComponent implements OnInit {

  readonly Typy = typy;

  public isLoading: boolean = false;

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  
  public filterForm: FormGroup;
  
  public dataSource;
  public filteredDataSource: MatTableDataSource<any>;
  public displayedColumns: string[] = ['Title', 'Version', 'Resolution', 'Software'];

  constructor(
    private matDialog: MatDialog,
    private formBuilder: FormBuilder,
    private bundleService: BundlesService,
    private activatedRoute: ActivatedRoute,
  ) {

    this.dataSource = this.activatedRoute.snapshot.data.plugins.data.products;
    this.filteredDataSource = new MatTableDataSource(this.dataSource);

    this.filterForm = formBuilder.group({
      filtro: ['', []]
    });
  }

  ngOnInit(): void {
    
    const requests = new Observable(request => {
      this.dataSource.forEach((plugin, index) => {
        setTimeout(() => request.next(this.bundleService.getPluginMetafields(plugin.ProductID)), (index + 1) * 500)
      });
      setTimeout(() => request.complete(), this.dataSource.length * 500);
    });

    requests.pipe().subscribe((response: Observable<any>) => {
      response.subscribe((res) => {
        const id = parseInt(res.url.substr(res.url.lastIndexOf('=') + 1));
        const temp = this.dataSource.find(plugin => plugin.ProductID === id);
        if (temp) {
          temp.metafields = {
            requirements: { value: 'N/A', id: null }
          };
          temp.metafields['aspect-ratios'] = { value: 'N/A', id: null };

          res.body.map(meta => {
            temp.metafields[`${meta.namespace}`.normalize()] = { value: meta.value, id: meta.id };
          });
        }
      })
    }, (error) => {
      // ToDo: tratar erro na busca pelos metafields de um produto
    });

  }

  ngAfterViewInit() {
    setTimeout(() => {
      this.filteredDataSource.sort = this.sort;
      this.filteredDataSource.paginator = this.paginator;
    });
  }

  registerLogs(plugin) {
    const dialogRef = this.matDialog.open(HistoryLogsModalComponent, {
      data: plugin
    });
    dialogRef.afterClosed().subscribe((response) => {
      if (response) {
        response['logs'] = { value: response['logs'], id: null };
        if (typy(plugin, 'metafields.history-log.id').safeObject) response['logs']['id'] = typy(plugin, 'metafields.history-log.id').safeObject;

        this.bundleService.savePluginLogMetafield(response.id, response).subscribe((response) => {
          plugin.Version = response.version;
          plugin.metafields['history-log'] = { value: response.metafield.value, id: response.metafield.id }
        }, (error) => {
          console.log(error);
        }, () => {
          // ToDo: Finalize loading
        });
      }
    });
  }

}
