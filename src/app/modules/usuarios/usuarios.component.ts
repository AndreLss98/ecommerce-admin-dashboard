import { Router } from '@angular/router';
import { Component, OnInit, ViewChild } from '@angular/core';

import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator, PageEvent } from '@angular/material/paginator';

import { UsuariosService } from './usuarios.service';

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
  
  data : any = [];
  public filteredData = [];
  public displayedColumns: string[] = ['CustomerName', 'CustomerEmail', 'Credits', 'Edit'];
  
  totalItems: number;
  previousPage: number;

  public isLoading: boolean = false;
  
  constructor(
    private router: Router,
    public usuarioService: UsuariosService,
  ) { }
  
  ngOnInit(): void {
    this.getAllUsuarios(0, 10);
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }

  public OnChange(event ? : PageEvent) {
    if(!event) return;     
    this.getAllUsuarios(event.pageIndex, event.pageSize);
    return event;
  }

  getAllUsuarios(offset, valueLimit) {
    this.isLoading = true;

    this.usuarioService.getAllUsuarios(offset + 1,valueLimit).subscribe(({ data }) => {
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

  searchUser(email: string) {
    this.router.navigate([`usuarios/edit/${email}`]);
  }

  applyFilter(search: string) {
    this.dataSource.filter = search.trim().toLowerCase();
  }
}

