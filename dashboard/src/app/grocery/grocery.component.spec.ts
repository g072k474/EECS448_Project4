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

  it('should call remove_item method on init', () => {
    // set up spies, 
    const GrocerySpy1 = spyOn(component, 'remove_item').and.callThrough();
    const GrocerySpy2 = spyOn(component, 'updateCost').and.callThrough();
    
    // make sure they haven't been called yet
    expect(GrocerySpy1).not.toHaveBeenCalled();
    expect(GrocerySpy2).not.toHaveBeenCalled();
  
    //call functionss
    component.ngOnInit();
    component.remove_item();
    
    //Check spies
    expect(GrocerySpy2).toHaveBeenCalledTimes(1);
    expect(GrocerySpy1).toHaveBeenCalledTimes(1);
  });


});
