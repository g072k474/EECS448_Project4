import { ComponentFixture, TestBed } from '@angular/core/testing';
import { GroceryListService } from '../grocery-list.service';

import { GroceryComponent } from './grocery.component';

describe('GroceryComponent', () => {
  let component: GroceryComponent;
  let fixture: ComponentFixture<GroceryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GroceryComponent ],
      providers: [{provide: GroceryListService, useClass: GroceryListService}]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GroceryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call updateCost method on init', () => {
    // set up spies, 
    const GrocerySpy1 = spyOn(component, 'remove_item').and.callThrough();
    const GrocerySpy2 = spyOn(component, 'updateCost').and.callThrough();
    
    // make sure they haven't been called yet
    expect(GrocerySpy1).not.toHaveBeenCalled();
    expect(GrocerySpy2).not.toHaveBeenCalled();
  
    //call functionss
    component.ngOnInit();
    component.remove_item();
    //component.updateCost();
    
    //Check spies
    expect(GrocerySpy2).toHaveBeenCalledTimes(2);
    expect(GrocerySpy1).toHaveBeenCalledTimes(1);
  });

  it('should call updateCost method on edit_item', () => {
    // set up spies, 
    const spy1 = spyOn(component, 'updateCost').and.callThrough();
    
    // make sure they haven't been called yet
    expect(spy1).not.toHaveBeenCalled();
  
    //call functionss
    component.edit_item('item', 'tes', 'field', 'value');
    //component.updateCost();
    
    //Check spies
    expect(spy1).toHaveBeenCalledTimes(1);
  });


});
