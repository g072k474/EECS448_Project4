import { Injectable } from '@angular/core';
import {GroceryItemService} from './grocery-item.service';

@Injectable({
  providedIn: 'root'
})
export class GroceryListService {
  label: string; // name of the grocery list
  date: Date; // date of creation of the list
  list_Cost: number = 0; // total cost of all items
  items:  GroceryItemService[]; // list of grocery items
  
  
  /** Constructor: Creates and initilaze the class  
 * @pre None
 * @post Component class created with all its dependencies
 * @param None 
 * @throws None
 * @return None
 */
  constructor(name) { 
    this.label = name;
    this.date = new Date(); // pick the current system date
    this.items = []; // initilize an empty list of groceries
  }


  /** updateCost: calculates the total of all prices times
   *          the quantity for each item
 * @pre None
 * @post the Total cost of the list is updated
 * @param None 
 * @throws None
 * @return None
 */
  updateCost(){
    this.list_Cost = 0;
    this.items.forEach(item => {
      this.list_Cost += (item.price * item.quantity);
    })
  }

  /** add_item: creates a new item and adds it to the array of items
 * @pre None
 * @post array of items updated with a new entry
 * @param {name} the new item's name. it's set to be "item number" by default
 * @param {price} the price of the item. set to 0 by default
 * @param {organic} states wether the item is organic or not
 * @param {quantity} how much/many items is the user buying
 * @param {category} category of the item
 * @throws None
 * @return None
 */
  add_item(name: string = ("Item " + (this.items.length + 1)), price:number = 0, organic: string = "Yes", quantity: number = 1, category?:string):void {
    var newItem = new GroceryItemService (name,category, price, organic, quantity); 
    this.items.push(newItem);
  }

/** remove_item: remove an item with the provided name
 * @pre the name exists in the array of items
 * @post None
 * @param {name} name of the item to remove
 * @throws None
 * @return None
 */
  remove_item(name: string):void{
    var found: boolean = false;
    this.items.forEach((item, index) =>{
      if(item.name == name){ 
        this.items.splice(index, 1);
        found = true;
      }
    });

    if(!found){
      alert(name + " Does not Exist.")
    }
  }

  
/** edit_item: this functions updates a field of the item with provided value.
* @pre None
* @post None
* @param {field}: The field to edit
* @param {value}: The new value for the field to edit
* @throws None
* @return None
*/
  edit_item(name: string, field, newVal):void{
    var found: boolean = false;
    this.items.forEach((item, index) =>{
      if(item.name == name){
        this.items[index].edit_item(field, newVal);
        found = true;
      }
    });

    if(!found){
      alert(name + " Does not Exist.")
    }
  }

}
