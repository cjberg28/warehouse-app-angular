import { Component } from '@angular/core';
import { WarehouseApiService } from './warehouse-api.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'warehouse-app-berg';

  requestType :string = "";
  warehouseAPIService :WarehouseApiService;

  constructor(warehouseAPIService :WarehouseApiService) { /* Get the API Service instance to be able to change the variables. */
    this.warehouseAPIService = warehouseAPIService;
  }

  processRequest() {

  }

  changeRequestType(request :string) {
    switch (request) {
      case 'GET':
        this.requestType = request;
    }
  }
}
