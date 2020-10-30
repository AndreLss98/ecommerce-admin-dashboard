import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { MatDialog } from '@angular/material/dialog';
import { BasicModalComponent } from 'src/app/shared/modals/basic-modal/basic-modal.component';

import { CreditosService } from './creditos.service';

@Component({
  selector: 'app-creditos',
  templateUrl: './creditos.component.html',
  styleUrls: ['./creditos.component.scss']
})
export class CreditosComponent implements OnInit {

  public data = [];
  public isLoading: boolean = false;
  public displayedColumns: string[] = ['ItemTitle', 'CreditsUsed'];
  public userName: string = '';
  public creditos: number;
  public creditosUsados: number;

  public filterForm: FormGroup;

  constructor(
    private matDialog: MatDialog,
    private formBuilder: FormBuilder,
    private creditosService: CreditosService
  ) {
    this.filterForm = formBuilder.group({
      email: ['', [Validators.required]]
    });
  }

  ngOnInit(): void {

  }

  search() {
    this.isLoading = true;
    this.resetVars();
    this.creditosService.getUserCreditsUsed(this.filterForm.value.email)
    .subscribe(response => {
      console.log(response);
      if (response.data.user) {
        this.isLoading = false;
        this.data = response.data.user.CreditosUsados;
        this.userName = response.data.user.CustomerName;
        this.creditos = response.data.user.Credits;
        this.creditosUsados = this.data.reduce((a, element) => a + element.CreditsUsed, 0);
      } else {
        this.matDialog.open(BasicModalComponent, {
          data: {
            title: "Aviso!",
            message: "Usuário não encontrado."
          }
        })
        this.resetVars();
      }
    }, (error) => {
      this.isLoading = false;
      this.resetVars()
    }, () => {
      this.isLoading = false;
    });
  }

  private resetVars() {
    this.data = [];
    this.userName = '';
    this.creditos = null;
    this.creditosUsados = 0;
  }
}
