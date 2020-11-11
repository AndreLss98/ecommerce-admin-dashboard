import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WorkInProgressComponent } from './work-in-progress/work-in-progress.component';
import { CustomLoadComponent } from './custom-load/custom-load.component';

@NgModule({
  declarations: [ WorkInProgressComponent, CustomLoadComponent ],
  imports: [
    CommonModule
  ],
  exports: [ WorkInProgressComponent, CustomLoadComponent ]
})
export class ComponentsModule { }
