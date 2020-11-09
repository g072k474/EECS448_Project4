import { Component, OnInit } from '@angular/core';
import {GroceryItemService} from '../grocery-item.service';
import {GroceryListService} from '../grocery-list.service';
import { ThrowStmt } from '@angular/compiler';


@Component({
  selector: 'app-grocery',
  templateUrl: './grocery.component.html',
  styleUrls: ['./grocery.component.css']
})

export class GroceryComponent implements OnInit {
  date: Date; // curent sytem date
  lists: GroceryListService[]; // List of grocery lists to show as accordion
  
  /** Constructor: Creates and initilaze the class 
 * @pre None
 * @post Component class created with all its dependencies
 * @param None 
 * @throws None
 * @return None
 */
  constructor() { }


   /** ngOnInit: lifecycle hook of the component called after
  *    the constructor to initialize the component. Here we create 4 items and
  *    put them in the list, then compute the total cost.
   * @pre the items and the array of items are delcared.
   * @post the items and the array are initialized.
   * @param None
   * @throws None
   * @return None
   */
  ngOnInit(): void {
    this.date = new Date();
    this.lists = []; // initialize to an empty list
    this.hideShowFields(true); // Hide all fields for edition (grocery list and items)

    this.updateCost();

  }

/** list_label_edit: this function takes the html inputs and search for a list name
* to update in the array or grocery lists
 * @pre The name from the input exists in the array of grocery lists
 * @post A list name is updates
 * @param None 
 * @throws None
 * @return None
 */
  list_label_edit(){
    //Get input fields
    var newName: string = (<HTMLInputElement>document.getElementById("listNameNew")).value;
    var listName: string = (<HTMLInputElement>document.getElementById("listNameOld")).value;
    var found: boolean = false;

    //Check if the value is valid before going further
    if(this.validInput("string", "listNameOld")){  
      this.lists.forEach((item, index) => {
        if(item.label === listName){
          found = true;
          item.label = newName;
        }
      })
    }
      //Tell the user if the name entred doesn't exist.
      if(!found){
        alert(listName + " Does not Exist.");
      }


      // Clear all fields
      listName = "";
      newName = "";
      (<HTMLInputElement>document.getElementById("listNameNew")).value = "";
      (<HTMLInputElement>document.getElementById("listNameOld")).value = "";
      this.hideShowFields(true);
  }

/** list_remove: this function takes the html inputs and search for a list name
* to remove from the array or grocery lists.
 * @pre The name from the input exists in the array of grocery lists.
 * @post the list name is removed.
 * @param None 
 * @throws None
 * @return None
 */
  list_remove(){
    //Get input field value
    var listName = (<HTMLInputElement>document.getElementById("lisToRemove")).value;
    var found: boolean = false;

    //Check input validity before going further
    if(this.validInput("string", "lisToRemove"))  {
      this.lists.forEach((item, index) =>{
        if (item.label == listName) this.lists.splice(index, 1);
        found = true;
      })
    }
    //Tell the user if the name entred doesn't exist.
    if(!found){
      alert(listName + " Does not Exist.");
    }

    // Clear all fields
    listName = "";
    (<HTMLInputElement>document.getElementById("lisToRemove")).value = "";
    this.hideShowFields(true);
  }

/** list_add: this function takes the html inputs and search for a list name
* to add to the array or grocery lists.
 * @pre None
 * @post a new grocery list is created and added 
 * @param None 
 * @throws None
 * @return None
 */
  list_add(){
    //Get input field value
    var listName = (<HTMLInputElement>document.getElementById("listToAdd")).value;

    //Check input validity before going further
    if(this.validInput("string", "listToAdd")){
      var newList: GroceryListService = new GroceryListService(listName);
      this.lists.push(newList);
    }

    // Clear all fields
    listName = "";
    (<HTMLInputElement>document.getElementById("listToAdd")).value = "";
    this.hideShowFields(true);
  }
  
/**validInput: This function checks the validity of an HTML input. This function
 *  gets called in all others where the input is taken form the user interface.
 * @pre None
 * @post None
 * @param {type} the type to check validity of. 
 * @param {field_selector} the id/class of the HTML input to check.
 * @throws None
 * @return None
 */
  validInput(type:string, field_selector:string):boolean{
    var val_toCheck;
    //Get input fields' values
    val_toCheck = (<HTMLInputElement>document.getElementById(field_selector)).value;
    var field: string = (<HTMLInputElement>document.getElementById(field_selector)).title;

    //if we are testing a number
    if(type === "number"){
      if (isNaN(val_toCheck) || val_toCheck <= 0 ) {
        alert("Invalid Input for: " + field);
        return false;
      }
     
    }else if(type === "string"){ // testing a string field
      if(val_toCheck.length < 1){
        alert("Invalid Input for: " + field);
        return false;
      }
    }else if(type === "yes/no"){ // testing a value that can only get yes or no
      if(val_toCheck != "Yes" && val_toCheck != "No"){
        alert("Invalid Input for: " + field);
        return false;
      }
    }
    return true;
  }

/** updateCost: This function is used to update the total cost after each change
 *            on the list of grocery items.
* @pre The array of items exists and is initilized
* @post The total cost is updated for the user
* @param None
* @throws None
* @return None
*/  
updateCost(){
  this.lists.forEach((item, index) => {
    this.lists[index].updateCost();
  })
}


/** add_item: this function takes the input from the user, puts it into variables, then
 *    creates a new object Item to add to the array of groceries. It also clears the values
 *    from the user interface and the variables used to grab information form the user interface       
* @pre The array of gorcery items exists.
* @post The array of grocery items is updated
* @param None
* @throws None
* @return None
*/
  add_item():void {
    //Get input field value
    var listName: string = (<HTMLInputElement>document.getElementById('listName1')).value;
    var item_name:string = (<HTMLInputElement>document.getElementById('itemName1')).value;
    var category:string  = (<HTMLInputElement>document.getElementById('itemCategory1')).value; 
    var price:number  = Number((<HTMLInputElement>document.getElementById('itemPrice1')).value);
    var organic:string = (<HTMLInputElement>document.getElementById('itemOrganic1')).value; 
    var quantity:number  = Number((<HTMLInputElement>document.getElementById('itemQuantity1')).value);
    
    //Check input validity before going further
    if(this.validInput("string","listName1") && this.validInput("string", "itemName1")
      && this.validInput("string", "itemCategory1") && this.validInput("number", "itemPrice1")
      && this.validInput("yes/no", "itemOrganic1") && this.validInput("number", "itemQuantity1")){
        var found: boolean = false;
        var newItem = new GroceryItemService (item_name,category, price, organic, quantity); 
        this.lists.forEach((item, index) => {
        if(listName === this.lists[index].label){
          this.lists[index].items.push(newItem);
          found = true;
          }
        })
        //Tell the user if the name entred doesn't exist.
        if(!found){
          alert(listName + " Does not Exist.")
        }
    }

    // Clear all fields
    listName = "";
    item_name = "";
    category = "";
    price = 0;
    quantity = 0;
    organic = "";
    this.updateCost();
    (<HTMLInputElement>document.getElementById('listName1')).value = "";
    (<HTMLInputElement>document.getElementById('itemName1')).value = "";
    (<HTMLInputElement>document.getElementById('itemCategory1')).value = ""; 
    (<HTMLInputElement>document.getElementById('itemPrice1')).value = "";
    (<HTMLInputElement>document.getElementById('itemOrganic1')).value = ""; 
    (<HTMLInputElement>document.getElementById('itemQuantity1')).value = "";
    this.hideShowFields(true);
  }


/** remove_item: this function takes the name of an item to remove from that the user typed.
 *  It then searches and removed that item from the list of groceries. It also clears the value
 *    from the user interface and the variable used to grab information form the user interface       
* @pre The array of gorcery items exists.
* @post The array of grocery items is updated
* @param None
* @throws None
* @return None
*/
  remove_item():void{
    //Get input field value
    var listName = (<HTMLInputElement>document.getElementById('listName2')).value;
    var item_name = (<HTMLInputElement>document.getElementById('itemName2')).value;
    //Check input validity before going further
    if(this.validInput("string","listName2") && this.validInput("string", "itemName2")){
      var found: boolean = false;
      this.lists.forEach((item, index) =>{
        if(item.label == listName) { 
          this.lists[index].remove_item(item_name);
          found = true;
        }
      });
      //Tell the user if the name entred doesn't exist.
      if(!found){
          alert(listName + " Does not Exist.")
        }
    }

    // Clear all fields
    listName = "";
    item_name = "";
    this.updateCost();
    (<HTMLInputElement>document.getElementById('listName2')).value = "";
    (<HTMLInputElement>document.getElementById('itemName2')).value = "";
    this.hideShowFields(true);
  }

/** edit_item: this function searches and item name from the list of groceries and 
 *          calls that item's edit_item function with the field and value to update.
* @pre The name is on the list
* @post The item is upated
* @param {name}: The name of the item to edit
* @param {field}: The field to edit
* @param {value}: The new value for the field to edit
* @throws None
* @return None
*/
  edit_item(list_name: string, item_name: string, field, value):void{
    var found: boolean = false;
    this.lists.forEach((item, index) =>{
      if(item.label == list_name) {
        this.lists[index].edit_item(item_name, field, value);
        found = true
      }
    });
    if(!found){
      alert(list_name + " Does not Exist.");
    }
    this.updateCost(); // update the total cost of the list
    this.hideShowFields(true); // hide all edition fields
  }

/** edit: this function takes the input from the user, puts it into variables, then
 *    calls the edit_item function with those variable sent as parameters. It also clears the values
 *    from the user interface and the variables used to grab information form the user interface       
* @pre None
* @post None
* @param None
* @throws None
* @return None
*/
  edit():void{//Get input field value
    var listName = (<HTMLInputElement>document.getElementById('listName3')).value;
    var name = (<HTMLInputElement>document.getElementById('itemName3')).value;
    var field = (<HTMLInputElement>document.getElementById('itemField')).value;
    var value = (<HTMLInputElement>document.getElementById('fieldValue')).value;
    var ifNumber: number;
  
    //Check input validity before going further
    if(field == "organic"){
      if(this.validInput("yes/no", "fieldValue")){
        this.edit_item(listName, name, field, value);
      }
    }else if(field == 'price' || field == 'quantity'){
      ifNumber = Number(value);
      if(this.validInput("string","listName3") && this.validInput("string", "itemName3")
        && this.validInput("number", "fieldValue")){
        this.edit_item(listName, name, field, ifNumber);
      }
    }else{
      if(this.validInput("string","listName3") && this.validInput("string", "itemName3")
        && this.validInput("number", "fieldValue")){
        this.edit_item(listName, name, field, value);
      }
    }
    // Clear all fields
    listName = "";
    name = "";
    field = "";
    value = "";
    ifNumber = 0;

    var normalInput = document.createElement("input");
    normalInput.id = "fieldValue";
    normalInput.type = "text";
    var toReplace = document.getElementById('fieldValue');
    var container = document.getElementById('fieldValue').parentNode;
    container.removeChild(toReplace);
    container.appendChild(normalInput);

    (<HTMLInputElement>document.getElementById('itemName3')).value = "";
    (<HTMLInputElement>document.getElementById('itemField')).value = "";
    (<HTMLInputElement>document.getElementById('fieldValue')).value = "";
    (<HTMLInputElement>document.getElementById('listName3')).value = "";
    this.hideShowFields(true); // hide all edition fields
  }

/**isOrganic: This function is called to change the HTML input type when the field to 
 *    edit is the one that states wether the grocery item is organic or not
* @pre None
* @post None
* @param None
* @throws None
* @return None
*/  
  isOrganic(){
    var field = (<HTMLInputElement>document.getElementById('itemField')).value;
    var value = (<HTMLInputElement>document.getElementById('fieldValue'));
    // if the field to edit is "organic", we remove the text input field
    //and replace it with a drop down with "yes" and "no".
    if(field == "organic"){
      var op1 = document.createElement("option");
      op1.value = "Yes";
      op1.innerHTML = "Yes";
      var op2 = document.createElement("option");
      op2.value = "No";
      op2.innerHTML = "No";
      var selector = document.createElement("select");
      selector.id="fieldValue";
      var toReplace = document.getElementById("fieldValue");
      var container = toReplace.parentNode;
      container.removeChild(toReplace);
      selector.appendChild(op1);
      selector.appendChild(op2);
      container.appendChild(selector);
    }else{ // if it is not the "organic" field we put back the normal text field
      var normalInput = document.createElement("input");
      normalInput.id = "fieldValue";
      normalInput.type = "text";
      var toReplace = document.getElementById('fieldValue');
      var container = document.getElementById('fieldValue').parentNode;
      container.removeChild(toReplace);
      container.appendChild(normalInput);
    }
  }

/** hideShowFields: This function is used to hide the fieldsets where the user modify
 *  grocery lists and gorcery items. We only want to show them the input fields according
 *  to what action the user wants to do.
* @pre None
* @post None
* @param None
* @throws None
* @return None
*/
  hideShowFields(hide:boolean = true){
    if(hide){
      (<HTMLElement>document.getElementById('add-item')).style.visibility= "hidden";
      (<HTMLElement>document.getElementById('edit-item')).style.visibility= "hidden";
      (<HTMLElement>document.getElementById('remove-item')).style.visibility= "hidden";
      (<HTMLElement>document.getElementById('add-list')).style.visibility= "hidden";
      (<HTMLElement>document.getElementById('edit-list')).style.visibility= "hidden";
      (<HTMLElement>document.getElementById('remove-list')).style.visibility= "hidden";
    }else{
      (<HTMLElement>document.getElementById('add-item')).style.visibility = "visible";
      (<HTMLElement>document.getElementById('edit-item')).style.visibility= "visible";
      (<HTMLElement>document.getElementById('remove-item')).style.visibility= "visible";
      (<HTMLElement>document.getElementById('add-list')).style.visibility= "visible";
      (<HTMLElement>document.getElementById('edit-list')).style.visibility= "visible";
      (<HTMLElement>document.getElementById('remove-list')).style.visibility= "visible";
    }
  }

/** flipView: this function is used in addition to fieldShowHide() to only show the user
 *  the fields they edit in order to fulfill the action they want
* @pre None
* @post None
* @param {itemOrList} this parameter specifies wethere we are editing a grocery item or
*                     a grocery list
* @throws None
* @return None
*/
  flipView(itemOrList: string = "grocery"){
    var isItem: boolean = false;

    //Get input fields' values
    var itemActions = (<HTMLInputElement>document.getElementById('item-edit-select')).value;
    var listActions = (<HTMLInputElement>document.getElementById('grocery-edit-select')).value;
    var actionScreen = (<HTMLInputElement>document.getElementById('action-screen'));
    
    this.hideShowFields(true);// hide all edition fields
    
    //Check if the user wants to edit grocery lists or 
    // grocery items
    if(itemOrList == "item"){
      isItem = true;
    }
    //Show the fields needed for the action choosen by the user
    if(itemActions == "Add" && isItem){
      (<HTMLElement>document.getElementById('add-item')).style.visibility = "visible";
    }else if (itemActions == "Remove" && isItem){
      (<HTMLElement>document.getElementById('remove-item')).style.visibility= "visible";
    }else if (itemActions == "Edit" && isItem){
      (<HTMLElement>document.getElementById('edit-item')).style.visibility= "visible";
    }


    if(listActions == "Add-G" && !isItem){
      (<HTMLElement>document.getElementById('add-list')).style.visibility= "visible";
    }else if (listActions == "Remove-G" && !isItem){
      (<HTMLElement>document.getElementById('remove-list')).style.visibility= "visible";
    }else if (listActions == "Change-G" && !isItem){
      (<HTMLElement>document.getElementById('edit-list')).style.visibility= "visible";
    }

    // Clear all fields and set the drop down menus to a default value
    isItem = false;
    itemActions = " ";
    listActions = " ";
    setTimeout(() => {
      (<HTMLInputElement>document.getElementById('item-edit-select')).value = "default";
      (<HTMLInputElement>document.getElementById('grocery-edit-select')).value = "default";
    }, 2000);
    
  }


/** accOpen: This the function that makes the accordion view possible for the list of 
 *    grocery lists.
* @pre None
* @post None
* @param None
* @throws None
* @return None
*/ 
 accOpen():void {
  this.hideShowFields(true);
    var acc = document.getElementsByClassName("accordion");
    var i;

    for (i = 0; i < acc.length; i++) {
      acc[i].addEventListener("click", function() {
        this.classList.toggle("active");
        var panel = this.nextElementSibling;
        if (panel.style.maxHeight) {
          panel.style.maxHeight = null;
        } else {
          panel.style.maxHeight = panel.scrollHeight + "px";
        } 
      });
    }
  }
  
}