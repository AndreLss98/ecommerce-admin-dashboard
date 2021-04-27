import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Component, OnInit, ViewChild } from '@angular/core';

import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

import { BundlesService } from '../bundles/bundles.service';

import { t as typy } from 'typy';
import { HistoryLogsModalComponent } from './history-logs-modal/history-logs-modal.component';
import { MetafieldsModalComponent } from './metafields-modal/metafields-modal.component';

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
  public categorias: string[] = [];
  public getMetafieldsObserver;
  public getTagsObserver;

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  
  public filterForm: FormGroup;
  
  public dataSource;
  public filteredDataSource: MatTableDataSource<any>;
  public displayedColumns: string[] = ['Title', 'Version', 'RetailPrice'];

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

    this.categorias = this.activatedRoute.snapshot.data.categorias.collections.map(cat => cat.title);

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

      if (data.categoria) {
        this.filteredDataSource.data = this.filteredDataSource.data.filter(plugin => plugin.tags && plugin.tags.includes(data.categoria));
      }
    })
  }

  ngOnInit(): void {
    const tagsRequests = new Observable(request => {
      this.dataSource.forEach(plugin => {
        request.next(this.bundleService.getPluginShopifyDetails(plugin.Handle));
      });
      request.complete();
    });

    this.getTagsObserver = tagsRequests.subscribe((observer: Observable<any>) => {
      try {
        observer.subscribe((res) => {
          const handle = res.url.substring(res.url.lastIndexOf('/') + 1, res.url.lastIndexOf('.'));
          const temp = this.dataSource.find(plugin => plugin.Handle === handle);
          if (temp) temp.tags = res.body.product.tags;
        }, (err) => {

        });
      } catch (error) {}
    });

  }

  ngAfterViewInit() {
    setTimeout(() => {
      this.filteredDataSource.sort = this.sort;
      this.filteredDataSource.paginator = this.paginator;
    });
  }

  ngOnDestroy() {
    // this.getMetafieldsObserver.unsubscribe();
  }

  registerLogs(plugin) {
    const dialogRef = this.matDialog.open(HistoryLogsModalComponent, {
      data: plugin,
      hasBackdrop: false
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

  viewMetaFields(productId) {
    
    this.matDialog.open(MetafieldsModalComponent, {
      data: {
        productId
      },
      width: '75%',
    })
  }

  applyFilter(search: string) {
    this.filteredDataSource.filter = search.trim().toLowerCase();
  }

}
