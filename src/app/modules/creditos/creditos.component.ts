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

  public isLoading: boolean = false;
  public dataSource: MatTableDataSource<any>;
  public data = [];
  public filteredData = [];
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
      agrupar_creditos: [false, []]
    });

    this.dataSource = new MatTableDataSource(this.data);
    this.filterForm.controls['agrupar_creditos'].valueChanges
      .subscribe(() => {
        this.checkGroup();
      });
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

      this.data = response.data.credits
      this.checkGroup();

      this.filterForm.controls['nome'].setValue('');
      this.filterForm.controls['creditos'].setValue(null);
    }, (error) => {
      this.isLoading = false;
      this.data = [];
      this.dataSource.data = this.data;
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

        this.data = response.data.user.CreditosUsados
        this.checkGroup();

        this.filterForm.controls['nome'].setValue(response.data.user.CustomerName);
        this.filterForm.controls['creditos'].setValue(response.data.user.Credits);
      } else {
        this.data = [];
        this.dataSource.data = this.data;
        this.openErroDialog("Usuário não encontrado.");
      }
    }, (error) => {
      this.isLoading = false;
      this.data = [];
      this.dataSource.data = this.data;
      this.openErroDialog("Erro de conexão.");
    }, () => {
      this.isLoading = false;
    });
  }

  getTotalCredits() {
    return this.data.length? this.data.reduce((acc, el) => acc + el.CreditsUsed, 0) : 0;
  }

  private openErroDialog(message) {
    
    this.matDialog.open(BasicModalComponent, {
      data: {
        title: "Aviso!", message
      }
    })
  }

  private checkGroup() {
    if (this.filterForm.controls['agrupar_creditos'].value) {
      this.filteredData = this.groupBy(this.data, 'ItemTitle', 'CreditsUsed');
      this.displayedColumns = ['ItemTitle', 'CreditsUsed'];
    } else {
      this.filteredData = this.data;
      this.displayedColumns = ['ItemTitle', 'UsageDate', 'CreditsUsed'];
    }

    this.dataSource.data = this.filteredData;
  }

  private groupBy(originalBuffer, key: string, accumulator: string) {
    return originalBuffer.reduce((buffer, element) => {
      const temp = buffer.find(el => el[key] === element[key]);
      temp? temp[accumulator] += element[accumulator] : buffer.push({...element});
      return buffer;
    }, []);
  }
}
