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
  public marjorVersions: string[] = [];
  public prices: number[] = [];
  public getMetafieldsObserver;

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  
  public filterForm: FormGroup;
  
  public dataSource;
  public filteredDataSource: MatTableDataSource<any>;
  public displayedColumns: string[] = ['Title', 'Version', 'RetailPrice', 'Resolution', 'Software'];

  constructor(
    private matDialog: MatDialog,
    private formBuilder: FormBuilder,
    private bundleService: BundlesService,
    private activatedRoute: ActivatedRoute,
  ) {

    this.dataSource = this.activatedRoute.snapshot.data.plugins.data.products;
    this.dataSource = this.dataSource.filter(el => el.Title);
    this.filteredDataSource = new MatTableDataSource(this.dataSource);

    this.marjorVersions = this.dataSource.reduce((buffer, element) => {
      if (!buffer.includes(element.Version)) buffer.push(element.Version);
      return buffer;
    }, []);

    this.prices = this.dataSource.reduce((buffer, element) => {
      if (element.RetailPrice && !buffer.includes(element.RetailPrice)) buffer.push(element.RetailPrice);
      return buffer;
    }, []);

    this.prices.sort((first, second) => first - second);
    this.marjorVersions.sort();

    this.filterForm = formBuilder.group({
      categoria: ['', []],
      versao: ['', []],
      preco: [null, []]
    });

    this.filterForm.valueChanges.subscribe((data) => {
      this.filteredDataSource.data = this.dataSource;
      if (data.versao) {
        this.filteredDataSource.data = this.filteredDataSource.data.filter(plugin => plugin.Version === data.versao);
      }

      if (data.preco) {
        this.filteredDataSource.data = this.filteredDataSource.data.filter(plugin => plugin.RetailPrice === data.preco);
      }
    })
  }

  ngOnInit(): void {

    this.filterForm.get('categoria').disable();

    const requests = new Observable(request => {
      this.dataSource.forEach((plugin, index) => {
        setTimeout(() => request.next(this.bundleService.getPluginMetafields(plugin.ProductID)), (index + 1) * 500)
      });
      setTimeout(() => request.complete(), this.dataSource.length * 500);
    });

    this.getMetafieldsObserver = requests.subscribe((response: Observable<any>) => {
      try {
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
        }, (error) => {});
      } catch (error) {
        // console.log(error)
      }
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

  ngOnDestroy() {
    this.getMetafieldsObserver.unsubscribe();
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
          plugin.UpgradedVersionAt = response.UpgradedVersionAt;
          plugin.metafields['history-log'] = response.metafields? { value: response.metafield.value, id: response.metafield.id } : { value: '', id: null };
        }, (error) => {
          console.log(error);
        }, () => {
          // ToDo: Finalize loading
        });
      }
    });
  }

}
