import { Observable } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
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

  public filteredPlugins : Observable<any>;

  public bundleForm: FormGroup;

  constructor(
    public router: Router,
    public route: ActivatedRoute,
    public formBuilder: FormBuilder,
    public bundleService: BundlesService
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
}
