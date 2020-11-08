import { ComponentFixture, TestBed } from '@angular/core/testing';
import { GroceryListService } from '../grocery-list.service';

import { GroceryComponent } from './grocery.component';

describe('GroceryComponent', () => {
  let component: GroceryComponent;
  let fixture: ComponentFixture<GroceryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GroceryComponent ]
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
    // set up spies, could also call a fake method in case you don't want the API call to go through
    //const ListServiceSpy = spyOn(GroceryListService, 'updateCost').and.callThrough();
    const GrocerySpy = spyOn(component, 'remove_item').and.callThrough();
  
    // make sure they haven't been called yet
    //expect(ListServiceSpy).not.toHaveBeenCalled();
    expect(GrocerySpy).not.toHaveBeenCalled();
  
    // depending on how your component is set up, fixture.detectChanges() might be enough
    component.ngOnInit();
  
    //expect(ListServiceSpy).toHaveBeenCalledTimes(1);
    expect(GrocerySpy).toHaveBeenCalledTimes(1);
  });
});
