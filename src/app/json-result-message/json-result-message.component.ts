import { Component, OnInit, Input } from '@angular/core';
import { JSONResultMessage } from '../models/JSONResultMessage';
import { WarehouseApiService } from '../warehouse-api.service';

@Component({
  selector: 'json-result-message-component',
  templateUrl: './json-result-message.component.html',
  styleUrls: ['./json-result-message.component.css']
})
export class JsonResultMessageComponent implements OnInit {

  @Input() jsonResultMessage :JSONResultMessage = new JSONResultMessage("");//Default message.
  warehouseAPIService :WarehouseApiService;

  //Dependency injection.
  constructor(warehouseAPIService :WarehouseApiService) { 
    this.warehouseAPIService = warehouseAPIService;
  }

  setJSONResultMessage(jsonResultMessage :JSONResultMessage) {
    this.jsonResultMessage = jsonResultMessage;
  }

  ngOnInit(): void {
  }

}
