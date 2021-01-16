import { DataSource } from '@angular/cdk/table';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-plugins',
  templateUrl: './plugins.component.html',
  styleUrls: ['./plugins.component.scss']
})
export class PluginsComponent implements OnInit {

  @ViewChild(MatSort)
  public sort: MatSort;
  
  public filterForm: FormGroup;
  
  public dataSource;
  public filteredDataSource: MatTableDataSource<any>;

  public displayedColumns: string[] = ['Title'];

  constructor(
    private formBuilder: FormBuilder,
    private activatedRoute: ActivatedRoute
  ) {
    this.filterForm = formBuilder.group({
      filtro: ['', []]
    });
  }

  ngOnInit(): void {
    this.dataSource = this.activatedRoute.snapshot.data.plugins.products;
    console.log(this.dataSource)
    this.filteredDataSource = new MatTableDataSource(this.dataSource);
  }

}
