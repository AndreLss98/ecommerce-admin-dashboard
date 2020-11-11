import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { map, startWith } from 'rxjs/operators';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

import { BundlesService } from '../bundles.service';

@Component({
  selector: 'app-bundle-form',
  templateUrl: './bundle-form.component.html',
  styleUrls: ['./bundle-form.component.scss']
})
export class BundleFormComponent implements OnInit {

  @ViewChild('pluginInput')
  public pluginInput: ElementRef<HTMLInputElement>;

  public selectedPlugins = [];
  public filteredPlugins : Observable<any>;

  public bundleForm: FormGroup;

  constructor(
    public router: Router,
    public formBuilder: FormBuilder,
    public bundleService: BundlesService
  ) {
    this.bundleForm = this.formBuilder.group({
      nome: ['', [Validators.required]],
      plugin_name: ['', []]
    });
  }

  ngOnInit(): void {
    this.filteredPlugins = this.bundleForm.controls['plugin_name'].valueChanges.pipe(
      startWith(''),
      map((plugin: string | null) => this._filterPlugin(plugin))
    );
  }

  add(plugin): void {
    const temp = this.bundleService.plugins.find(el => el.ItemTitle === plugin.value);
    if (temp) {
      this.selectedPlugins.push(temp);
      this.bundleForm.controls['plugin_name'].setValue(null);
      this.pluginInput.nativeElement.value = '';
    }
  }

  remove(plugin): void {
    this.selectedPlugins.splice(this.selectedPlugins.indexOf(plugin), 1);
    this.bundleForm.controls['plugin_name'].setValue(null);
  }

  selected(event): void {
    this.selectedPlugins.push(
      this.bundleService.plugins
        .find(el => el.ItemTitle === event.option.viewValue)
    );

    this.bundleForm.controls['plugin_name'].setValue(null);
    this.pluginInput.nativeElement.value = '';
  }

  private _filterPlugin(plugin: string): any[] {
    return this.bundleService.plugins
      .filter(el => {
        const found = this.selectedPlugins
          .find(pl => pl.ItemTitle.toLowerCase() === el.ItemTitle.toLowerCase());
        
        const search = plugin? el.ItemTitle.toLowerCase().indexOf(plugin.toLowerCase()) === 0 : true;
        
        return found === undefined && search
      });
  }
}
