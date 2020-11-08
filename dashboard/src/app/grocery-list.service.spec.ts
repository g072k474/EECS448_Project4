import { TestBed } from '@angular/core/testing';

import { GroceryListService } from './grocery-list.service';

describe('GroceryListService', () => {
  let service: GroceryListService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GroceryListService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should call remove_item method with item', () => {
    // set up spies, 
    const spy1 = spyOn(service, 'remove_item').and.callThrough();
    
    // make sure they haven't been called yet
    expect(spy1).not.toHaveBeenCalled();
  
    //call functions
    service.remove_item('item');
    
    //Check spies
    expect(spy1).toHaveBeenCalledWith('item');
  });

  it('should call edit_item method on item', () => {
    // set up spies, 
    const spy1 = spyOn(service, 'edit_item').and.callThrough();
    
    // make sure they haven't been called yet
    expect(spy1).not.toHaveBeenCalled();
  
    //call functions
    service.edit_item('item', 'field', 'val');
    
    //Check spies
    expect(spy1).toHaveBeenCalledWith('item', 'field', 'val');
  });
});
