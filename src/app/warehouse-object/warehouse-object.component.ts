import { NumberSymbol } from '@angular/common';
import { Component, OnInit, Input } from '@angular/core';
import { WarehouseObject } from '../models/WarehouseObject';
import { WarehouseApiService } from '../warehouse-api.service';

@Component({
  selector: 'warehouse-object-component',
  templateUrl: './warehouse-object.component.html',
  styleUrls: ['./warehouse-object.component.css']
})
export class WarehouseObjectComponent implements OnInit {

  @Input() warehouseObject :WarehouseObject = new WarehouseObject(-1,0,"",""); /* Default replacement for a null value. */
  warehouseAPIService :WarehouseApiService;

  constructor(warehouseAPIService :WarehouseApiService) { 
    this.warehouseAPIService = warehouseAPIService;
  }

  setWarehouseObject(warehouseObject :WarehouseObject) {
    this.warehouseObject = warehouseObject;
  }

  ngOnInit(): void {
  }

}
