import { Component, Inject } from '@angular/core';
import { WarehouseApiService } from './warehouse-api.service';
import { WarehouseObject } from './models/WarehouseObject';
import { JSONResultMessage } from './models/JSONResultMessage';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'warehouse-app-berg';

  requestType :string = "";
  warehouseAPIService :WarehouseApiService;

  slotIDInputText :string;
  spaceRequiredInputText :string;
  descriptionInputText :string;
  typeInputDropdown :string;
  warehouseObjects :Array<WarehouseObject> = [];//Default empty. Will be changed dynamically.
  warehouseObject :WarehouseObject = new WarehouseObject(0,0,"","MISC");//Default
  jsonResults :Array<JSONResultMessage> = [];//Default empty.
  jsonResult :JSONResultMessage = new JSONResultMessage("");//Default

  constructor(warehouseAPIService :WarehouseApiService) {
    /* Get the API Service instance to be able to make HTTP requests. Inject the document to gain access to DOM manipulation.*/
    this.warehouseAPIService = warehouseAPIService;
    this.slotIDInputText = "";
    this.spaceRequiredInputText = "";
    this.descriptionInputText = "";
    this.typeInputDropdown = "";
    
  }

  /* Function called by pressing the "Send Request" button. It determines the request type, then sends the appropriate request and displays the results.*/
  processRequest() {
    this.jsonResults = [];
    this.warehouseObjects = [];//Clears the notices from the previous query.
    switch (this.requestType) {
      case 'GET'://WORKS!!
        //Check first if slotId has an entry. If so, prioritize it over type.

        if (this.slotIDInputText != "") {//User entered a slotId.

          if (this.slotIDInputText.toUpperCase() == "ALL") {
            this.warehouseAPIService.findAll().subscribe(data => {
              this.warehouseObjects = data;//Send array of warehouse objects to be used in ngFor component creation
            });
          }

          else {
            let id :number = parseInt(this.slotIDInputText);//Could return NaN if not parseable.
            if (id != NaN && id > 0) {//Valid slotId. Edge case: Float?
              //Valid slotId returns a single object. Non-existent slotId returns null.
              this.warehouseAPIService.findBySlotId(id).subscribe(data => {
                this.warehouseObject = data;
                if (this.warehouseObject != null) {
                  this.warehouseObjects = [this.warehouseObject];//Send array to ngFor
                } else {//Item does not exist.
                  this.jsonResult = new JSONResultMessage("The object with the provided Slot ID does not exist in the database.");
                  this.jsonResults = [this.jsonResult];//Send array to ngFor
                }
              });
            }
            
            else {//Invalid slotId - Not a number or nonpositive slotId.
              this.jsonResult = new JSONResultMessage("Invalid Slot ID entered. Please leave the field blank if searching by Type.");
              this.jsonResults = [this.jsonResult];
            }
          }
        }

        else {//slotId search failed. Try searching by type. This field will never be empty (dropdown).
          this.warehouseAPIService.findAllOfType(this.typeInputDropdown).subscribe(data => {
            if (data != null && data != "") {
              this.warehouseObjects = data;//Send array to ngFor
            } else {//No objects of that type exist.
              this.jsonResult = new JSONResultMessage("No objects with the given Type exist in the database.");
              this.jsonResults = [this.jsonResult];
            }
          })
        }
        this.clearInputFields();
        break;
      case 'POST'://WORKS!!
        //Assign each input field to a WarehouseObject field, then call a POST request with that object. 0 for slotId because DAO method doesn't use it and it will be assigned.

        let space :number = parseFloat(this.spaceRequiredInputText);

        if (space <= 0) {
          this.jsonResult = new JSONResultMessage("Addition to warehouse failed - Space Required is 0, negative, or invalid.");
          this.jsonResults = [this.jsonResult];
        } else {
          this.warehouseObject = new WarehouseObject(0,space,this.descriptionInputText,this.typeInputDropdown);

          this.warehouseAPIService.save(this.warehouseObject).subscribe(data => {
            //The doPost() servlet method is guaranteed to return one of these objects:
            //Case 1: WarehouseObject
            //Case 2: JSONResultMessage

            if (data.hasOwnProperty('message')) {//If the data has a message property, it is a JSONResultMessage
              this.jsonResult = data;
              this.jsonResults = [this.jsonResult];
            } else {//It is a WarehouseObject
              this.warehouseObject = data;
              this.warehouseObjects = [this.warehouseObject];
            }
          });
        }
        this.clearInputFields();
        break;
      case 'PUT'://WORKS!!
        //PUT only gives JSONResultMessage's back.
        this.warehouseObject = new WarehouseObject(parseInt(this.slotIDInputText),parseFloat(this.spaceRequiredInputText),this.descriptionInputText,this.typeInputDropdown);
        this.clearInputFields();
        this.warehouseAPIService.update(this.warehouseObject).subscribe(data => {
          this.jsonResult = data;
          this.jsonResults = [this.jsonResult];
        });
        break;
      case 'DELETE'://WORKS!!
        let id :number = parseInt(this.slotIDInputText);

        if (id != NaN) {//Valid ID given.
          this.warehouseAPIService.delete(parseInt(this.slotIDInputText)).subscribe(data => {
            this.jsonResult = data;
            this.jsonResults = [this.jsonResult];
          });
        } else {//For some reason, this code never fires. Strange.
          this.jsonResult = new JSONResultMessage("The object you are trying to delete does not exist in the database, or an invalid Slot ID was entered. Please try again.");
        }
        this.clearInputFields();
        break;
      default://WORKS!!
        this.requestType = "";
        this.jsonResult = new JSONResultMessage("Please select a request type from the buttons at the top of the screen.");
        this.jsonResults = [this.jsonResult];
    }
  }

  /* Function called by pressing the menu buttons. Changes request to GET/POST/PUT/UPDATE.*/
  changeRequestType(request :string) {
    this.requestType = request;
  }

  //Clears the input fields.
  clearInputFields() {
    this.slotIDInputText = "";
    this.spaceRequiredInputText = "";
    this.descriptionInputText = "";
    this.typeInputDropdown = "";
  }
}
