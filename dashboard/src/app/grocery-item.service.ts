import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GroceryItemService {
  name: string;
  category: string;
  price: number;
  organic:string;
  quantity: number = 1;

  /** Constructor: Creates and initilaze the class 
 * @pre None
 * @post Component class created with all its dependencies
 * @param None 
 * @throws None
 * @return None
 */
  constructor(name: string = "item", category: string = " ", price = 0, 
  organic = "No", quantity: number = 1){
    this.name = name;
    this.category = category;
    this.price = price;
    this.organic = organic;
    this.quantity = quantity;
    console.log(name + "added\n");
  }

/** edit_item: this functions updates a field of the item with provided value.
* @pre None
* @post None
* @param {field}: The field to edit
* @param {value}: The new value for the field to edit
* @throws None
* @return None
*/
  edit_item(field, newVal):void{
    console.log("edit function");
    if('name' === field){
      this.name  = newVal;
      console.log("edit name " + this.name);

   }else if(field === 'category'){
    this.category = newVal;
    console.log("edit name " + this.name);

   }else if(field  === 'price'){
    this.price = newVal;
    console.log("edit name " + this.name);

   } else if(field  === 'organic'){
      this.organic = newVal;
      console.log("edit name " + this.name);
      
   }else if(field === 'quantity'){
    this.quantity = newVal;
    console.log("Quantity Change " + this.quantity);
   }
    
  }
}
