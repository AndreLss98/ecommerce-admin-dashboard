import localePt from '@angular/common/locales/pt';
import { NgModule, LOCALE_ID } from '@angular/core';
import { registerLocaleData } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatToolbarModule } from '@angular/material/toolbar';

import { AppRoutingModule } from './app-routing.module';
import { MatButtonModule } from '@angular/material/button';

import { AppComponent } from './app.component';
import { BasicModalComponent } from './shared/modals/basic-modal/basic-modal.component';
import { MatDialogModule } from '@angular/material/dialog';
import { PageNotFoundComponent } from './modules/page-not-found/page-not-found.component';

registerLocaleData(localePt);

@NgModule({
  declarations: [
    AppComponent,
    BasicModalComponent,
    PageNotFoundComponent
  ],
  imports: [
    BrowserModule,
    MatButtonModule,
    MatDialogModule,
    MatToolbarModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
  ],
  providers: [
    { provide: LOCALE_ID, useValue: "pt-BR" }
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
