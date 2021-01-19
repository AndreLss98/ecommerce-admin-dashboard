import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';

import { ToolbarComponent } from './toolbar/toolbar.component';
import { RemoveHtmlPipe } from 'src/app/shared/pipes/remove-html.pipe';
import { CustomLoadComponent } from './custom-load/custom-load.component';
import { WorkInProgressComponent } from './work-in-progress/work-in-progress.component';

@NgModule({
  declarations: [
    WorkInProgressComponent,
    CustomLoadComponent,
    ToolbarComponent,
    RemoveHtmlPipe
  ],
  imports: [
    CommonModule,
    RouterModule,
    MatIconModule,
    MatMenuModule,
    MatButtonModule,
    MatToolbarModule,
  ],
  exports: [
    WorkInProgressComponent,
    CustomLoadComponent,
    ToolbarComponent,
    RemoveHtmlPipe
  ]
})
export class ComponentsModule { }
