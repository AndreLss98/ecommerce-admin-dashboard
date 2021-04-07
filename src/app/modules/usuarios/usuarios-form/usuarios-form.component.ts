import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { BasicModalComponent } from 'src/app/shared/modals/basic-modal/basic-modal.component';
import { UsuariosService } from '../usuarios.service';

@Component({
  selector: 'app-usuarios-form',
  templateUrl: './usuarios-form.component.html',
  styleUrls: ['./usuarios-form.component.scss']
})
export class UsuariosFormComponent implements OnInit {
  @ViewChild(MatSort)
  public sort: MatSort;

  @ViewChild(MatPaginator)
  public paginator: MatPaginator;
  public filteredDownload: Observable<any>;
  public userForm: FormGroup;

  public usuariosform: UsuariosFormComponent;
  public dataSource: MatTableDataSource<any> = new MatTableDataSource([]);
  public displayedColumns: string[] = ['PluginName','Edit','Delete'];
  data : any = [];
  public isLoading: boolean = false;
  

  constructor(
    public router: Router,
    public activeRoute: ActivatedRoute,
    private matDialog: MatDialog,
    public usuariosService: UsuariosService
  ) { }

  ngOnInit(): void {
    console.log(this.activeRoute.snapshot.data);
    this.dataSource.data = this.data = this.activeRoute.snapshot.data.usuario.data.user.LinksDownload;
  }3
  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }
  
  applyFilter(search: string) {
    this.dataSource.filter = search.trim().toLowerCase();
  }


}
