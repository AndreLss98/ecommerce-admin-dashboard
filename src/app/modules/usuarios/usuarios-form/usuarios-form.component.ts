import { Observable } from 'rxjs';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit, ViewChild } from '@angular/core';

import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

import { UsuariosService } from '../usuarios.service';

@Component({
  selector: 'app-usuarios-form',
  templateUrl: './usuarios-form.component.html',
  styleUrls: ['./usuarios-form.component.scss']
})
export class UsuariosFormComponent implements OnInit {
  private _currentUser: any;

  @ViewChild(MatSort)
  public sort: MatSort;

  @ViewChild(MatPaginator)
  public paginator: MatPaginator;
  
  public userForm: FormGroup;
  public filteredDownload: Observable<any>;

  public usuariosform: UsuariosFormComponent;
  public dataSource: MatTableDataSource<any> = new MatTableDataSource([]);
  
  data : any = [];
  public isLoading: boolean = false;
  public displayedColumns: string[] = ['PluginName', 'Edit', 'Delete'];
  

  constructor(
    public router: Router,
    private matDialog: MatDialog,
    private formBuilder: FormBuilder,
    public activeRoute: ActivatedRoute,
    public usuariosService: UsuariosService,
  ) {
    this.userForm = formBuilder.group({
      nome: [""],
      email: [""],
      creditos: [null, [Validators.min(0), Validators.required]]
    });
  }

  public get currentUser(): any {
    return this._currentUser;
  }
  public set currentUser(value: any) {
    this._currentUser = value;
  }

  ngOnInit(): void {
    this.currentUser = this.activeRoute.snapshot.data.usuario.data.user;
    if(this.currentUser) {
      this.dataSource.data = this.data = this.currentUser.LinksDownload;
      
      setTimeout(() => {
        this.userForm.reset({
          nome: this.currentUser.CustomerName,
          email: this.currentUser.CustomerEmail,
          creditos: this.currentUser.Credits
        })
      },)
    }
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }
  
  applyFilter(search: string) {
    this.dataSource.filter = search.trim().toLowerCase();
  }
}
