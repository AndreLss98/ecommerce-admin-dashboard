import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WorkInProgressComponent } from './work-in-progress/work-in-progress.component';

@NgModule({
  declarations: [ WorkInProgressComponent ],
  imports: [
    CommonModule
  ],
  exports: [ WorkInProgressComponent ]
})
export class ComponentsModule { }
