import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { FormGroup, ReactiveFormsModule, FormsModule, FormBuilder } from '@angular/forms';
import { BudgetComponent } from './budget.component';

describe('BudgetComponent', () => {
  let component: BudgetComponent;
  let fixture: ComponentFixture<BudgetComponent>;
  let test: any;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [
        FormsModule,
        FormBuilder,
      ],
      declarations: [ BudgetComponent, ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BudgetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should show amount is 500', () =>{
    spyOn(component, 'updateAmount');
    component.updateAmount(500);
    expect(component.updateAmount).toHaveBeenCalledWith(500);
  });

  it('should show itemp is 250', () =>{
    spyOn(component, 'addIncome');
    component.addIncome(250);
    expect(component.addIncome).toHaveBeenCalledWith(250);
  });

  it('should show income is 250', () =>{
    spyOn(component, 'updateIncome');
    component.updateIncome(250);
    expect(component.updateIncome).toHaveBeenCalledWith(250);
  });

  it('should show ctemp is Rent', () =>{
    spyOn(component, 'addCategory');
    component.addCategory('Rent');
    expect(component.addCategory).toHaveBeenCalledWith('Rent');
  });

  it('should have Rent add Category array', () =>{
    spyOn(component, 'updateCategoryList');
    component.updateCategoryList('Rent');
    expect(component.updateCategoryList).toHaveBeenCalledWith('Rent');
  });

  it('should show expense is 100', () =>{
    spyOn(component, 'addExpense');
    component.addExpense(100);
    expect(component.addExpense).toHaveBeenCalledWith(100);
  });
  
  it('should show percent is 5', () =>{
    spyOn(component, 'addSavings');
    component.addSavings(5);
    expect(component.addSavings).toHaveBeenCalledWith(5);
  });
});
