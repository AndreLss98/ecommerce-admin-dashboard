import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { AlertModalComponent } from 'src/app/shared/modals/alert-modal/alert-modal.component';
import { UsuariosService } from './usuarios.service';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0', visibility: 'hidden' })),
      state('expanded', style({ height: '*', visibility: 'visible' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ])
  ]
})
export class UsuariosComponent implements OnInit {
  @ViewChild(MatSort)
  public sort: MatSort;

  @ViewChild(MatPaginator)
  public paginator: MatPaginator;
  pageEvent : PageEvent;
  data : any = [];
  public filteredData = [];
  public dataSource: MatTableDataSource<any> = new MatTableDataSource([]);
  public displayedColumns: string[] = ['CustomerName','Credits','Edit'];

  public isLoading: boolean = false;
  
  public expandedUser;
  constructor(
    private _usuarioService: UsuariosService,
    private router: Router,
    private matDialog: MatDialog,
  ) { }
  
  ngOnInit(): void {
    this.getAllUsuarios(10);
    this.OnChange(null);
  }
  public OnChange(event ? : PageEvent){
    this.getAllUsuarios(event.pageSize);
    return event;
  }
  getAllUsuarios(valueLimit){
    this.isLoading = true;
    this._usuarioService.getAllUsuarios(1,valueLimit).subscribe(({data}) => {
      this._usuarioService.usuarios = this.dataSource.data = this.data = data.users;
      
      console.log(data);
    },
    (error) => {
      this.isLoading = false;
    }, () => {
      this.isLoading = false;
    });
  }


  getUserInfo(usuario){
    console.log(usuario);
  }
  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  applyFilter(search: string) {
    this.dataSource.filter = search.trim().toLowerCase();
  }


}

