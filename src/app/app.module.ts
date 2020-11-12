import localePt from '@angular/common/locales/pt';
import { NgModule, LOCALE_ID } from '@angular/core';
import { registerLocaleData } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatToolbarModule } from '@angular/material/toolbar';

import { AppRoutingModule } from './app-routing.module';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';

import { AppComponent } from './app.component';
import { BasicModalComponent } from './shared/modals/basic-modal/basic-modal.component';
import { AlertModalComponent } from './shared/modals/alert-modal/alert-modal.component';
import { PageNotFoundComponent } from './modules/page-not-found/page-not-found.component';
import { MatIconModule } from '@angular/material/icon';

registerLocaleData(localePt);

@NgModule({
  declarations: [
    AppComponent,
    BasicModalComponent,
    AlertModalComponent,
    PageNotFoundComponent,
  ],
  imports: [
    BrowserModule,
    MatIconModule,
    MatButtonModule,
    MatDialogModule,
    MatToolbarModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule
  ],
  providers: [
    { provide: LOCALE_ID, useValue: "pt-BR" }
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
