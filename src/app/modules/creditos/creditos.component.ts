import { FormBuilder, FormGroup } from '@angular/forms';
import { Component, OnInit, ViewChild } from '@angular/core';

import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { BasicModalComponent } from 'src/app/shared/modals/basic-modal/basic-modal.component';

import { CreditosService } from './creditos.service';

@Component({
  selector: 'app-creditos',
  templateUrl: './creditos.component.html',
  styleUrls: ['./creditos.component.scss']
})
export class CreditosComponent implements OnInit {

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  readonly maxDate: Date = new Date();

  public dataSource: MatTableDataSource<any>;
  public isLoading: boolean = false;
  public displayedColumns: string[] = ['ItemTitle', 'UsageDate', 'CreditsUsed'];

  public filterForm: FormGroup;

  constructor(
    private matDialog: MatDialog,
    private formBuilder: FormBuilder,
    private creditosService: CreditosService
  ) {
    this.filterForm = formBuilder.group({
      email: ['', []],
      nome: ['', []],
      start: [null, []],
      end: [null, []],
      creditos: [null, []],
      creditos_usados: [null, []]
    });

    this.dataSource = new MatTableDataSource([]);
  }

  ngOnInit(): void {

  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  search() {
    if (this.filterForm.controls['email'].value) {
      this.searchUser();
    } else if (this.filterForm.controls['start'].value) {
      this.searchInterval();
    }
  }

  searchInterval() {
    this.isLoading = true;

    this.creditosService.getAllInInterval(
      this.filterForm.controls['start'].value.toISOString().replace(/\T.{1,}/, 'T01:00:00.000Z'),
      this.filterForm.controls['end'].value? this.filterForm.controls['end'].value.toISOString().replace(/\T.{1,}/, 'T23:59:59.000Z') : ''
    ).subscribe(response => {
      this.isLoading = false;
      this.dataSource.data = response.data.credits;

      this.filterForm.controls['nome'].setValue('');
      this.filterForm.controls['creditos'].setValue(null);
      this.filterForm.controls['creditos_usados'].setValue(null);
    }, (error) => {
      this.isLoading = false;
      this.openErroDialog("Erro de conexão.");
    }, () => {
      this.isLoading = false;
    });
  }

  searchUser() {
    this.isLoading = true;

    this.creditosService.getUserCreditsUsed(this.filterForm.value.email)
    .subscribe(response => {
      if (response.data.user) {
        this.isLoading = false;

        if (this.filterForm.controls['start'].value) {
          response.data.user.CreditosUsados = response.data.user.CreditosUsados
            .filter(credit => Number(credit.UsageDate) >= this.filterForm.controls['start'].value.setHours(0, 0, 0, 0));
        }

        if (this.filterForm.controls['end'].value) {
          response.data.user.CreditosUsados = response.data.user.CreditosUsados
            .filter(credit => Number(credit.UsageDate) <= this.filterForm.controls['end'].value.setHours(23, 59, 59, 999));
        }

        this.dataSource.data = response.data.user.CreditosUsados;

        this.filterForm.controls['nome'].setValue(response.data.user.CustomerName);
        this.filterForm.controls['creditos'].setValue(response.data.user.Credits);
        this.filterForm.controls['creditos_usados'].setValue(this.dataSource.data.reduce((a, element) => a + element.CreditsUsed, 0));
      } else {
        this.openErroDialog("Usuário não encontrado.");
      }
    }, (error) => {
      this.isLoading = false;
      this.openErroDialog("Erro de conexão.");
    }, () => {
      this.isLoading = false;
    });
  }

  private openErroDialog(message) {
    
    this.matDialog.open(BasicModalComponent, {
      data: {
        title: "Aviso!", message
      }
    })
  }
}