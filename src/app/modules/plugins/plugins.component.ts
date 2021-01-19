import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Component, OnInit, ViewChild } from '@angular/core';

import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

import { BundlesService } from '../bundles/bundles.service';

import { t as typy } from 'typy';

@Component({
  selector: 'app-plugins',
  templateUrl: './plugins.component.html',
  styleUrls: ['./plugins.component.scss']
})
export class PluginsComponent implements OnInit {

  readonly Typy = typy;

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  
  public filterForm: FormGroup;
  
  public dataSource;
  public filteredDataSource: MatTableDataSource<any>;

  public displayedColumns: string[] = ['Title', 'Version', 'Resolution', 'Software'];

  constructor(
    private formBuilder: FormBuilder,
    private bundleService: BundlesService,
    private activatedRoute: ActivatedRoute
  ) {

    this.dataSource = this.activatedRoute.snapshot.data.plugins.data.products;
    console.log(this.dataSource)
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
            requirements: '-'
          };
          temp.metafields['aspect-ratios'] = '-';

          res.body.map(meta => {
            temp.metafields[`${meta.namespace}`.normalize()] = meta.value;
          });
        }
      })
    }, (error) => {
      console.log(error)
    })

  }

  ngAfterViewInit() {
    setTimeout(() => {
      this.filteredDataSource.sort = this.sort;
      this.filteredDataSource.paginator = this.paginator;
    });
  }

}
