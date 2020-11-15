import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';

import { WorkInProgressComponent } from './work-in-progress/work-in-progress.component';
import { CustomLoadComponent } from './custom-load/custom-load.component';
import { ToolbarComponent } from './toolbar/toolbar.component';

@NgModule({
  declarations: [
    WorkInProgressComponent,
    CustomLoadComponent,
    ToolbarComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    MatButtonModule,
    MatToolbarModule,
  ],
  exports: [
    WorkInProgressComponent,
    CustomLoadComponent,
    ToolbarComponent
  ]
})
export class ComponentsModule { }
