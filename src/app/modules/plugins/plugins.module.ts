import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { PluginsRoutingModule } from './plugins-routing.module';

import { PluginsComponent } from './plugins.component';

import { MatSortModule } from '@angular/material/sort';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ComponentsModule } from 'src/app/shared/components/components.module';
import { HistoryLogsModalComponent } from './history-logs-modal/history-logs-modal.component';
import { MetafieldsModalComponent } from './metafields-modal/metafields-modal.component';

@NgModule({
  declarations: [ PluginsComponent, HistoryLogsModalComponent, MetafieldsModalComponent ],
  imports: [
    FormsModule,
    CommonModule,
    MatSortModule,
    MatIconModule,
    MatTableModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatDialogModule,
    ComponentsModule,
    MatDividerModule,
    MatFormFieldModule,
    MatPaginatorModule,
    ReactiveFormsModule,
    PluginsRoutingModule,
  ]
})
export class PluginsModule { }
