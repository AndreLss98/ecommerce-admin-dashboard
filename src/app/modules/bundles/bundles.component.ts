import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { animate, state, style, transition, trigger } from '@angular/animations';

import { BundlesService } from './bundles.service';

@Component({
  selector: 'app-bundles',
  templateUrl: './bundles.component.html',
  styleUrls: ['./bundles.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0', visibility: 'hidden' })),
      state('expanded', style({ height: '*', visibility: 'visible' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ])
  ]
})
export class BundlesComponent implements OnInit {

  @ViewChild(MatSort)
  public sort: MatSort;

  @ViewChild(MatPaginator)
  public paginator: MatPaginator;

  public data = [];
  public filteredData = [];
  public dataSource: MatTableDataSource<any> = new MatTableDataSource([]);
  public displayedColumns: string[] = ['ItemTitle', 'Edit'];

  public isLoading: boolean = false;

  public expandedBundle;

  constructor(
    private bundleService: BundlesService
  ) { }

  ngOnInit(): void {
    this.fetchAllBundles();
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  applyFilter(search: string) {
    this.dataSource.filter = search.trim().toLowerCase();
  }

  private fetchAllBundles() {
    this.bundleService.getAll().subscribe(response => {
      this.dataSource.data = this.data = response;
    });    
  }
}
