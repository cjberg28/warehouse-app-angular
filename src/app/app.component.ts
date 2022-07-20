import { Component, Inject } from '@angular/core';
import { WarehouseApiService } from './warehouse-api.service';
import { DOCUMENT } from '@angular/common';
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

  private document :Document;
  slotIDInputText :string;
  spaceRequiredInputText :string;
  descriptionInputText :string;
  typeInputDropdown :string;
  warehouseObjects :Array<WarehouseObject> = [];//Default empty. Will be changed dynamically.
  warehouseObject :WarehouseObject = new WarehouseObject(0,0,"","MISC");//Default
  jsonResults :Array<JSONResultMessage> = [];//Default empty.
  jsonResult :JSONResultMessage = new JSONResultMessage("");//Default

  constructor(warehouseAPIService :WarehouseApiService, @Inject(DOCUMENT) private d :Document) {
    /* Get the API Service instance to be able to make HTTP requests. Inject the document to gain access to DOM manipulation.*/
    this.warehouseAPIService = warehouseAPIService;
    this.document = d;
    console.log("Document: " + this.document);
    this.slotIDInputText = "";
    this.spaceRequiredInputText = "";
    this.descriptionInputText = "";
    this.typeInputDropdown = "";
    
  }

  /* Function called by pressing the "Send Request" button. */
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
            if (data != null || data != []) {
              this.warehouseObjects = data;//Send array to ngFor
            } else {//No objects of that type exist.
              this.jsonResult = new JSONResultMessage("No objects with the given Type exist in the database.");
              this.jsonResults = [this.jsonResult];
            }
          })
        }
        this.clearInputFields();
        break;
      case 'POST':
        //Assign each input field to a WarehouseObject field, then call a POST request with that object. 0 for slotId because DAO method doesn't use it and it will be assigned.
        //Could give NaN for parseFloat().
        this.warehouseObject = new WarehouseObject(0,parseFloat(this.spaceRequiredInputText),this.descriptionInputText,this.typeInputDropdown);

        this.clearInputFields();
        this.warehouseAPIService.save(this.warehouseObject).subscribe(data => {
          //Function to process the returned warehouse object. It will have a new slotId.
          //Case 1: Updated WarehouseObject
          //Case 2: JSONResultMessage



          //TODO
          try {//Case 1
            this.warehouseObject = data;
            this.jsonResult = data;
            try {//Check if I can access a message property from warehouseObject. If yes, problem.
              this.warehouseObject.slotId;
            } catch (e) {

            }
            this.warehouseObjects = [this.warehouseObject];
          } catch (e) {//Case 2
            this.jsonResult = data;
            this.jsonResults = [this.jsonResult];
          }
        });
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

  /* Function called by pressing the menu buttons. */
  changeRequestType(request :string) {
    this.requestType = request;
  }

  //This will never work because the objects keep returning as null.
  clearInputFields() {
    this.slotIDInputText = "";
    this.spaceRequiredInputText = "";
    this.descriptionInputText = "";
    this.typeInputDropdown = "";
  }

  //This function takes in a Node and removes its children.
  //Used to remove all dynamically-created cards in my results-container.
  removeAllChildren(parent :Node) {
    while (parent.firstChild) {
      parent.removeChild(parent.firstChild);
    }
  }
}
