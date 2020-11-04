import localePt from '@angular/common/locales/pt';
import { NgModule, LOCALE_ID } from '@angular/core';
import { registerLocaleData } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';

import {MatDialogModule} from '@angular/material/dialog';
import {MatButtonModule} from '@angular/material/button';
import {MatNativeDateModule} from '@angular/material/core';
import { MatToolbarModule } from '@angular/material/toolbar';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BasicModalComponent } from './shared/modals/basic-modal/basic-modal.component';

registerLocaleData(localePt);

@NgModule({
  declarations: [
    AppComponent,
    BasicModalComponent
  ],
  imports: [
    BrowserModule,
    MatDialogModule,
    MatButtonModule,
    MatToolbarModule,
    AppRoutingModule,
    HttpClientModule,
    MatNativeDateModule,
    BrowserAnimationsModule,
  ],
  providers: [
    { provide: LOCALE_ID, useValue: "pt-BR" }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
