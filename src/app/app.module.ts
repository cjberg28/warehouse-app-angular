import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
// Import all PrimeNG modules here!!
import {ButtonModule} from 'primeng/button';
import {DropdownModule} from 'primeng/dropdown';
import { WarehouseObjectComponent } from './warehouse-object/warehouse-object.component';
import {CardModule} from 'primeng/card';

@NgModule({
  declarations: [
    AppComponent,
    WarehouseObjectComponent
  ],
  imports: [
    //Add all PrimeNG modules here so they can be used in your application!!
    BrowserModule,
    AppRoutingModule,
    ButtonModule,
    DropdownModule,
    CardModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
