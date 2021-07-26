import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Component, OnInit, ViewChild } from '@angular/core';

import * as moment from 'moment';
import exporterReport from 'export-from-json';

import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

import { BasicModalComponent } from 'src/app/shared/modals/basic-modal/basic-modal.component';

import { CreditosService } from './creditos.service';

@Component({
  selector: 'creditos',
  templateUrl: './creditos.component.html',
  styleUrls: ['./creditos.component.scss']
})
export class CreditosComponent implements OnInit {

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  readonly maxDate: Date = new Date();

  public isLoading: boolean = false;
  public dataSource: MatTableDataSource<any>;
  public plugins = [];
  public filteredPlugins: Observable<any>;
  public data = [];
  public filteredData = [];
  public displayedColumns: string[] = ['ItemTitle', 'CustomerEmail', 'UsageDate', 'CreditsUsed'];

  public filterForm: FormGroup;
  public countColumn = 'Créditos usados';

  public currentUser = {
    CustomerID: null,
    creditos: 0,
    nome: '',
    originalQtdOfCredits: 0,
  }

  public minValueOfCredits = 0;
  public confirmUpdateCreditsModal;

  constructor(
    private matDialog: MatDialog,
    private router: ActivatedRoute,
    private formBuilder: FormBuilder,
    private creditosService: CreditosService,
  ) {
    this.filterForm = formBuilder.group({
      email: ['', []],
      start: [null, []],
      end: [null, []],
      agrupar_creditos: [false, []],
      type_view: [false, []],
      plugin_name: [ '', [] ]
    });

    this.dataSource = new MatTableDataSource(this.data);
    
    this.filterForm.controls['agrupar_creditos'].valueChanges
      .subscribe(() => {
        this.checkGroup();
      });

    this.filterForm.controls['type_view'].valueChanges
      .subscribe(() => {
        this.checkGroup();
      });

    this.filterForm.controls['email'].valueChanges
      .subscribe(() => {
        if (this.filterForm.get('email').value) this.filterForm.get('plugin_name').setValue('');
      });

    this.filterForm.controls['plugin_name'].valueChanges
      .subscribe(() => {
        if (this.filterForm.get('plugin_name').value) this.filterForm.get('email').setValue('');
      });

    this.plugins = this.router.snapshot.data.plugins.products;
  }

  ngOnInit(): void {
    this.filteredPlugins = this.filterForm.get('plugin_name').valueChanges.pipe(
      startWith(''),
      map((plugin: string | null) => this._filterPlugins(plugin))
    )
  }

  private _filterPlugins(plugin: string): any[] {
    return this.plugins.filter(el => el.title.toLowerCase().includes(plugin.toLocaleLowerCase()))
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }
  
  applyFilter(search: string) {
    this.dataSource.filter = search.trim().toLowerCase();
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
    let tempPluginSearch = this.filterForm.get('plugin_name').value;
    let tempPlugin = null;
    if (tempPluginSearch) {
      tempPlugin = this.plugins.find(el => el.title.toLowerCase() === tempPluginSearch.toLowerCase());
      if (!tempPlugin) {
        this.openErroDialog("Plugin não encontrado.");
        this.isLoading = false;
        return
      } else {
        this.currentUser = {
          CustomerID: null,
          creditos: 0,
          nome: '',
          originalQtdOfCredits: 0,
        }
      }
    }
    
    this.creditosService.getAllInInterval(
      this.filterForm.controls['start'].value.toISOString().replace(/\T.{1,}/, 'T01:00:00.000Z'),
      this.filterForm.controls['end'].value? this.filterForm.controls['end'].value.toISOString().replace(/\T.{1,}/, 'T23:59:59.000Z') : '',
      tempPluginSearch? this.plugins.find(el => el.title.toLowerCase() === this.filterForm.get('plugin_name').value.toLowerCase()).id : null
    ).subscribe(response => {
      console.log(response)
      this.isLoading = false;
      this.data = response.data.credits;
      this.data = this.data.map(el => {
        let temp = { ...el, CustomerEmail: el.Customer? el.Customer.CustomerEmail : '' };
        delete temp.Customer;
        return temp;
      });

      this.checkGroup();
      try {
        this.filterForm.controls['nome'].setValue('');
        this.filterForm.controls['creditos'].setValue(null);
      } catch (error) { }
    }, (error) => {
      console.log(error)
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

        this.currentUser = {
          CustomerID: response.data.user.CustomerID,
          creditos: response.data.user.Credits,
          nome: response.data.user.CustomerName,
          originalQtdOfCredits: response.data.user.Credits
        };

        this.minValueOfCredits = response.data.user.Credits >= 0? response.data.user.Credits : 0;
        
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
    return this.filteredData.length? this.filteredData.reduce((acc, el) => acc + el.CreditsUsed, 0) : 0;
  }

  private openErroDialog(message) {
    this.matDialog.open(BasicModalComponent, {
      data: {
        title: "Aviso!", message
      }
    })
  }

  private checkGroup() {

    this.displayedColumns = ['ItemTitle'];

    if (!this.filterForm.get('email').value && !this.filterForm.get('agrupar_creditos').value) {
      this.displayedColumns.push('CustomerEmail');
    }

    if (this.data && this.filterForm.get('type_view').value) {
      this.filteredData = this.data.filter(el => el['CreditsUsed'] == 0);
      this.countColumn = 'Qtd. Downloads';
    } else if (this.data) {
      this.filteredData = this.data.filter(el => el['CreditsUsed'] == 1);
      this.countColumn = 'Créditos usados';
    }

    if (this.filterForm.get('agrupar_creditos').value) {
      this.filteredData = this.groupBy(this.filteredData, 'ItemTitle', 'CreditsUsed');
    } else {
      this.filteredData = this.filteredData;
    }

    if (!this.filterForm.get('agrupar_creditos').value) {
      this.displayedColumns.push('UsageDate');
    }

    if (
      (this.filterForm.get('agrupar_creditos').value && this.filterForm.get('type_view').value) ||
      !this.filterForm.get('type_view').value
    ) {
      this.displayedColumns.push('CreditsUsed');
    }

    this.dataSource.data = this.filteredData;
  }

  private groupBy(originalBuffer, key: string, accumulator: string) {
    return originalBuffer.reduce((buffer, element) => {
      let temp = buffer.find(el => el[key] === element[key]);
      if (temp) {
        ++temp[accumulator];
      } else {
        temp = { ...element };
        temp[accumulator] = 1;
        buffer.push(temp);
      }
      return buffer;
    }, []);
  }

  public generateReport(exportType) {
    let fileType  = 'text/plain';
    exporterReport({
      data: this.dataSource.data.map((element)=>{ return {...element, UsageDate: moment(element.UsageDate, 'x').format('L') } }),
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
