import { Observable } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { map, startWith } from 'rxjs/operators';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

import { BundlesService } from '../bundles.service';
import { MatDialog } from '@angular/material/dialog';
import { BasicModalComponent } from 'src/app/shared/modals/basic-modal/basic-modal.component';

@Component({
  selector: 'app-bundle-form',
  templateUrl: './bundle-form.component.html',
  styleUrls: ['./bundle-form.component.scss']
})
export class BundleFormComponent implements OnInit {

  @ViewChild('pluginInput')
  public pluginInput: ElementRef<HTMLInputElement>;

  public filteredPlugins : Observable<any>;

  public bundleForm: FormGroup;
  public isLoading: boolean = false;

  constructor(
    public router: Router,
    private matDialog: MatDialog,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    public bundleService: BundlesService,
  ) {
    this.bundleForm = this.formBuilder.group({
      nome: ['', [Validators.required]],
      plugin_name: ['', []],
      selected_plugins: [[], [Validators.minLength(2)]]
    });
  }

  ngOnInit(): void {
    this.filteredPlugins = this.bundleForm.controls['plugin_name'].valueChanges.pipe(
      startWith(''),
      map((plugin: string | null) => this._filterPlugin(plugin))
    );
  }

  ngAfterViewInit() {
    setTimeout(() => {
      this._resetForm();
      this.router.url.includes('edit')? this.bundleForm.get('nome').disable() : this.bundleForm.get('nome').enable();
    })
  }

  onSubmit() {
    this.isLoading = true;
    setTimeout(() => {
      const dialogRefence = this.matDialog.open(BasicModalComponent, {
        data: {
          title: "Parabéns",
          message: `Bundle ${this.router.url.includes('new')? 'salvo' : 'atualizado'} com sucesso`
        }
      });

      dialogRefence.afterOpened().subscribe(() => {
        this.isLoading = false;
      });

      dialogRefence.beforeClosed().subscribe(() => {
        this.router.navigate(['/bundles'], { replaceUrl: true });
      });

    }, 5000)
  }

  add(plugin): void {
    const tempPlugin = this.bundleService.plugins.find(el => el.ItemTitle === plugin.value);
    if (tempPlugin) {
      let temp = this.bundleForm.get('selected_plugins').value;
      temp.push(tempPlugin);
      this.bundleForm.get('selected_plugins').setValue(temp);
      this.bundleForm.controls['plugin_name'].setValue(null);
      this.pluginInput.nativeElement.value = '';
    }
  }

  remove(plugin): void {
    let temp = this.bundleForm.get('selected_plugins').value;
    temp.splice(temp.indexOf(plugin), 1);
    this.bundleForm.get('selected_plugins').setValue(temp);
    this.bundleForm.controls['plugin_name'].setValue(null);
  }

  selected(event): void {
    let temp = this.bundleForm.get('selected_plugins').value;
    temp.push(
      this.bundleService.plugins
        .find(el => el.ItemTitle === event.option.viewValue)
    );
    this.bundleForm.get('selected_plugins').setValue(temp);
    this.bundleForm.controls['plugin_name'].setValue(null);
    this.pluginInput.nativeElement.value = '';
  }

  private _filterPlugin(plugin: string): any[] {
    return this.bundleService.plugins
      .filter(el => {
        const found = this.bundleForm.get('selected_plugins').value
          .find(pl => pl.ItemTitle.toLowerCase() === el.ItemTitle.toLowerCase());
        
        const search = plugin? el.ItemTitle.toLowerCase().indexOf(plugin.toLowerCase()) === 0 : true;
        
        return found === undefined && search;
      });
  }

  private _resetForm() {
    const temp = this.route.snapshot.data['bundle'];
    this.bundleForm.reset({
      nome: temp.title,
      selected_plugins: temp.plugins
    });
    this.bundleForm.get('plugin_name').setValue('');
  }

  goBack() {
    this.router.navigate(['/bundles'], { replaceUrl: true });
  }
}
