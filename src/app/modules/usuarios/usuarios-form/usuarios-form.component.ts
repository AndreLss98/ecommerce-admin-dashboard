import { Observable } from 'rxjs';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit, ViewChild } from '@angular/core';

import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

import { UsuariosService } from '../usuarios.service';

import { AlertModalComponent } from 'src/app/shared/modals/alert-modal/alert-modal.component';
import { ChangePluginModalComponent } from '../../creditos/change-plugin-modal/change-plugin-modal.component';

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
    console.log(this._currentUser)
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

  deletePlugin(plugin) {
    const dialogReference = this.matDialog.open(AlertModalComponent, {
      data: {
        title: 'Aviso',
        message: `Tem certeza que deseja excluir ${plugin.ItemTitle} do histórico do usuário?`
      }
    });

    dialogReference.afterClosed().subscribe((data) => {
      if(data) {
        this.usuariosService.deletePluginFromHistoric(plugin.LinkID).subscribe((response) => {
          this.dataSource.data = this.data = this.currentUser.LinksDownload = this.currentUser.LinksDownload
            .filter(element => element.LinkID !== plugin.LinkID);
        }, (error) => {
          console.log(error);
        }, () => {

        });
      }
    });
  }

  alterPlugin(currentPlugin) {
    const dialogRef = this.matDialog.open(ChangePluginModalComponent, {
      maxHeight: '400px',
      data: { currentPlugin }
    });

    dialogRef.afterClosed().subscribe((data) => {
      if (data) {
        const confirmActionModalRef = this.matDialog.open(AlertModalComponent, {
          data: {
            title: "Atenção",
            message: `Confirma a troca de plugins? De: ${currentPlugin.ItemTitle} Para: ${data.title} `
          },
          disableClose: true
        });

        confirmActionModalRef.afterClosed().subscribe((confirmResult) => {
          if (confirmResult) {
            this.usuariosService.alterPluginInHistoricUser(
              currentPlugin.LinkID,
              this.currentUser.ShopifyCustomerNumber,
              currentPlugin.ItemID,
              data
            ).subscribe(() => {
              console.log('Plugin alterado');
            }, (error) => {
              console.log(error)
            }, () => {

            });
          }
        });
      }
    });
  }

  addPlugin() {
    const dialogRef = this.matDialog.open(ChangePluginModalComponent, {
      maxHeight: '400px',
      data: { }
    });

    dialogRef.afterClosed().subscribe((data) => {
      if (data) {
        this.usuariosService.addPluginInHistoricUser(data.id, this.currentUser.ShopifyCustomerNumber).subscribe((response) => {
          console.log(response);
        }, (error) => {
          console.log(error);
        }, () => {

        });
      }
    })
  }
}
