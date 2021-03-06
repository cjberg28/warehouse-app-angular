import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
// Import all PrimeNG modules here!!
import {ButtonModule} from 'primeng/button';
import {DropdownModule} from 'primeng/dropdown';
import { WarehouseObjectComponent } from './warehouse-object/warehouse-object.component';
import {CardModule} from 'primeng/card';
import { HttpClientModule } from '@angular/common/http';
import { JsonResultMessageComponent } from './json-result-message/json-result-message.component';
import { FormsModule } from '@angular/forms';
import {InputTextModule} from 'primeng/inputtext';

@NgModule({
  declarations: [
    AppComponent,
    WarehouseObjectComponent,
    JsonResultMessageComponent,
  ],
  imports: [
    //Add all PrimeNG modules here so they can be used in your application!!
    BrowserModule,
    AppRoutingModule,
    ButtonModule,
    DropdownModule,
    CardModule,
    HttpClientModule,
    FormsModule,
    InputTextModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
