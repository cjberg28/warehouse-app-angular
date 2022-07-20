import { Component, Inject } from '@angular/core';
import { WarehouseApiService } from './warehouse-api.service';
import { DOCUMENT } from '@angular/common';
import { WarehouseObject } from './models/WarehouseObject';
import { WarehouseObjectComponent } from './warehouse-object/warehouse-object.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'warehouse-app-berg';

  requestType :string = "";
  warehouseAPIService :WarehouseApiService;

  document :Document;
  findButton :HTMLElement | null;
  addButton :HTMLElement | null;
  updateButton :HTMLElement | null;
  deleteButton :HTMLElement | null;
  sendButton :HTMLElement | null;
  slotIDInputText :HTMLInputElement;
  spaceRequiredInputText :HTMLInputElement;
  descriptionInputText :HTMLInputElement;
  typeInputDropdown :HTMLInputElement;

  constructor(warehouseAPIService :WarehouseApiService, @Inject(DOCUMENT) document :Document) {
    /* Get the API Service instance to be able to make HTTP requests. Inject the document to gain access to DOM manipulation.*/
    this.warehouseAPIService = warehouseAPIService;
    this.document = document;
    /* Get references to all major input HTML elements on the page to dynamically clear them when buttons are pressed. */
    this.findButton = this.document.getElementById("find-button");
    this.addButton = this.document.getElementById("add-button");
    this.updateButton = this.document.getElementById("update-button");
    this.deleteButton = this.document.getElementById("delete-button");
    this.sendButton = this.document.getElementById("send-button");
    this.slotIDInputText = this.document.getElementById("slot-id-input") as HTMLInputElement;
    this.spaceRequiredInputText = this.document.getElementById("space-required-input") as HTMLInputElement;
    this.descriptionInputText = this.document.getElementById("description-input") as HTMLInputElement;
    this.typeInputDropdown = this.document.getElementById("type-dropdown-input") as HTMLInputElement;//This may not be correct, as it is a dropdown.
  }

  /* Function called by pressing the "Send Request" button. */
  processRequest() {
    switch (this.requestType) {
      case 'GET':
        //Check first if slotId has an entry. If so, prioritize it over type.
        let warehouseObjects :Array<WarehouseObject>;
        let warehouseObject :WarehouseObject;//Can use this in later cases without needing to re-declare.

        if (this.slotIDInputText.value != "") {//User entered a slotId.

          //TODO: Maybe add if slotId = all?

          let id :number = parseInt(this.slotIDInputText.value);//Could return NaN if not parseable.
          if (id != NaN && id > 0) {//Valid slotId. Edge case: Float?
            //Valid slotId returns a single object. Non-existent slotId returns null.
            this.warehouseAPIService.findBySlotId(id).subscribe(data => {
              warehouseObject = data;
              if (warehouseObject != null) {
                //Use document.createElement() and document.appendChild() to create a new WarehouseObjectComponent and add it to the results container.
              } else {
                //Use document.createElement() and document.appendChild() to create a new JSONResultMessageComponent and add it to the results container.
              }
              
            });
          } else {//Try searching by type.
            //TODO

          }
        }
        break;
      case 'POST':
        //Assign each input field to a WarehouseObject field, then call a POST request with that object. 0 for slotId because DAO method doesn't use it and it will be assigned.
        warehouseObject = new WarehouseObject(0,parseFloat(this.spaceRequiredInputText.value),this.descriptionInputText.value,this.typeInputDropdown.value);
        this.clearInputFields();
        this.warehouseAPIService.save(warehouseObject).subscribe(data => {
          //Function to process the returned warehouse object. It will have a new slotId.
          //Case 1: Updated WarehouseObject
          //Case 2: JSONResultMessage
          try {
            warehouseObject = data;//Case 1
            //Use document.createElement() and document.appendChild() to create a new WarehouseObjectComponent and add it to the results container.
            let wareObjComp :HTMLElement = this.document.createElement("warehouse-object-component");
            let wareObjCompTS :WarehouseObjectComponent = wareObjComp as WarehouseObjectComponent;
            wareObjComp.setWarehouseObject


            let warehouseObjectComponent :WarehouseObjectComponent = new WarehouseObjectComponent(this.warehouseAPIService);
            warehouseObjectComponent.setWarehouseObject(warehouseObject);
            this.document.getElementById("results-container")?.appendChild(warehouseObjectComponent);
          } catch (e) {//Case 2
            //Use document.createElement() and document.appendChild() to create a new JSONResultMessageComponent and add it to the results container.
            //TODO
          }
        });
        break;
      default:
        this.requestType = "";
        throw new TypeError("Invalid request type.");
    }
  }

  /* Function called by pressing the menu buttons. */
  changeRequestType(request :string) {
    this.requestType = request;
  }

  clearInputFields() {
    this.slotIDInputText.value = "";
    this.spaceRequiredInputText.value = "";
    this.descriptionInputText.value = "";
    this.typeInputDropdown.value = "EQUIPMENT";//First value.
  }
}
