import { Router } from '@angular/router';
import { Component, OnInit, ViewChild } from '@angular/core';

import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator, PageEvent } from '@angular/material/paginator';

import { UsuariosService } from './usuarios.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import exporterReport from 'export-from-json';
import * as moment from 'moment';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.scss']
})
export class UsuariosComponent implements OnInit {
  @ViewChild(MatSort)
  public sort: MatSort;

  @ViewChild(MatPaginator)
  pageEvent : PageEvent;

  paginator: MatPaginator;
  public dataSource: MatTableDataSource<any> = new MatTableDataSource([]);
  readonly maxDate: Date = new Date();
  
  data : any = [];
  public filteredData = [];
  public displayedColumns: string[] = ['CustomerName', 'CustomerEmail', 'Credits', 'LastAccess' , 'TotalAccessLog', 'Edit'];
  public filterForm: FormGroup;
  private _pIndex: any;
  public get pIndex(): any {
    return this._pIndex;
  }
  public set pIndex(value: any) {
    this._pIndex = value;
  }
  private _pSize: any;
  public get pSize(): any {
    return this._pSize;
  }
  public set pSize(value: any) {
    this._pSize = value;
  }

  totalItems: number;
  previousPage: number;

  public isLoading: boolean = false;
  
  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    public usuarioService: UsuariosService,
  ) {   
    this.filterForm = formBuilder.group({
    email: ['', []],
    top: ['', []],
    start: [null, []],
    end: [null, []],
    type_view: [false, []],
  }); }
  
  ngOnInit(): void {
    this.pIndex = 0;
    this.pSize = 10;
    this.getAllUsuarios(this.pIndex, this.pSize, "", "", null);
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }

  public OnChange(event ? : PageEvent) {
    if(!event) return;     
    this.pIndex = event.pageIndex;
    this.pSize = event.pageSize;
    let startDate = "";
    let endDate = "";
    let topUser = null;
    if(this.filterForm.controls['start'].value){
      startDate = this.filterForm.controls['start'].value.toISOString().replace(/\T.{1,}/, 'T01:00:00.000Z');
    }
    if(this.filterForm.controls['end'].value){
      endDate = this.filterForm.controls['end'].value? this.filterForm.controls['end'].value.toISOString().replace(/\T.{1,}/, 'T23:59:59.000Z') : '';
    }
    this.getAllUsuarios(event.pageIndex, event.pageSize, startDate, endDate, topUser);
    return event;
  }

  getAllUsuarios(offset, valueLimit, startDate, endDate, topUsers) {
    this.isLoading = true;
    this.usuarioService.getAllUsuarios(offset + 1, valueLimit, startDate, endDate, topUsers ).subscribe(({ data }) => {
      this.usuarioService.usuarios = this.dataSource.data = this.data = data.users.data;
        this.totalItems = data.users.totalItems;
      this.previousPage = data.users.previousPage;
    }, (error) => {
      this.isLoading = false;
    }, () => {
      this.isLoading = false;
    });
  }

  editUser(usuario) {
    this.router.navigate([`usuarios/edit/${usuario.CustomerEmail}`]);
  }

  search(){
    if (this.filterForm.controls['email'].value) {
      this.searchUser(this.filterForm.controls['email'].value);
    } else if (this.filterForm.controls['start'].value) {
      this.filterForm.controls['top'].reset();
      this.searchInterval();
    } else if(this.filterForm.controls['top'].value) {
      this.filterForm.controls['start'].reset();
      this.searchTopUsers();
    }
  }

  clear(){
    this.filterForm.controls['start'].reset();
    this.filterForm.controls['top'].reset();
    this.filterForm.controls['email'].reset();
  }

  searchInterval() {

    //console.log(this.pIndex, this.pSize,  this.filterForm.controls['start'].value.toISOString().replace(/\T.{1,}/, 'T01:00:00.000Z'), this.filterForm.controls['end'].value? this.filterForm.controls['end'].value.toISOString().replace(/\T.{1,}/, 'T23:59:59.000Z') : '',);
    this.getAllUsuarios(this.pIndex, this.pSize, this.filterForm.controls['start'].value.toISOString().replace(/\T.{1,}/, 'T01:00:00.000Z'), 
    this.filterForm.controls['end'].value? this.filterForm.controls['end'].value.toISOString().replace(/\T.{1,}/, 'T23:59:59.000Z') : '', null
    );
  }

  searchTopUsers(){
    let startDate = "";
    let endDate = "";
    let numero = this.filterForm.controls['top'].value;
    this.getAllUsuarios(this.pIndex, this.pSize, startDate, endDate, numero);
  }

  searchUser(email: string) {
    this.router.navigate([`usuarios/edit/${email}`]);
  }

  applyFilter(search: string) {
    this.dataSource.filter = search.trim().toLowerCase();
  }

  public async generateReport(exportType) {
    let fileType  = 'text/plain';
    let buffer = [];
    let pageOffset = 1;
    let stopFlag = false;

    if(this.filterForm.get('top').value){
      buffer = this.dataSource.data;
    }else {
      while(!stopFlag){
        const response = this.usuarioService.getAllUsuarios( pageOffset , 200, this.filterForm.controls['start'].value.toISOString().replace(/\T.{1,}/, 'T01:00:00.000Z'),
        this.filterForm.controls['end'].value? this.filterForm.controls['end'].value.toISOString().replace(/\T.{1,}/, 'T23:59:59.000Z') : '', null  
        ).toPromise();
        await response.then( ({data})=>{
          if(!data.users.nextPage) stopFlag = true;
          pageOffset++;
          buffer = buffer.concat(data.users.data);
        })
      }
    }
    console.log(buffer);
    exporterReport({
      data: buffer.map((element)=>{ return {...element, LastAccess: moment(element.LastAccess, 'x').format('L') } }),
      fileName: `relatorio-${moment().format()}`,
      exportType,
      processor (content, type, fileName) {
        switch (type) {
          case 'csv':
            fileType = 'text/csv';
            break;
          case 'xls':
            fileType = 'application/ms-excel';
            break;
        }
        let downloadLink = document.createElement('a');
        downloadLink.href = window.URL.createObjectURL(new Blob([content], { type: fileType }));
        downloadLink.setAttribute('download', fileName);
        document.body.appendChild(downloadLink);
        downloadLink.click();
        window.URL.revokeObjectURL(downloadLink.href);
      }
    });
  }
}

