import localePt from '@angular/common/locales/pt';
import { NgModule, LOCALE_ID } from '@angular/core';
import { registerLocaleData } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';

import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';

import { ComponentsModule } from './shared/components/components.module';

import { AppComponent } from './app.component';
import { BasicModalComponent } from './shared/modals/basic-modal/basic-modal.component';
import { AlertModalComponent } from './shared/modals/alert-modal/alert-modal.component';
import { PageNotFoundComponent } from './modules/page-not-found/page-not-found.component';

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
    ComponentsModule,
    MatToolbarModule,
    MatSidenavModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule
  ],
  providers: [
    { provide: LOCALE_ID, useValue: "pt-BR" }
  ],
  bootstrap: [ AppComponent ],
})
export class AppModule { }
