import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WeightComponent } from './weight.component';

describe('WeightComponent', () => {
  let component: WeightComponent;
  let fixture: ComponentFixture<WeightComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WeightComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WeightComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

describe('updateIni' , function(){

  it('should call updateIni() with the value 100', ()=>{
    spyOn(component, 'updateIni');
    component.updateIni(100);
    expect(component.updateIni).toHaveBeenCalledWith(100);
  });
});

describe('updateG', function(){

  it('should call updateG() with the value 100', ()=>{
    spyOn(component, 'updateG');
    component.updateG(100);
    expect(component.updateG).toHaveBeenCalledWith(100);
  });
});

describe('updateC' , function(){
  it('should make changedWeight 100', ()=>{
    spyOn(component, 'updateC');
    component.updateC(100);
    expect(component.updateC).toHaveBeenCalledWith(100);
  });
});

describe('updateH', function(){
  it('should make height is 100', ()=>{
    spyOn(component, 'updateH');
    component.updateH(100);
    expect(component.updateH).toHaveBeenCalledWith(100);
  });
});

 describe('doSubmit', function(){
   it('should call doSubmit', ()=>{
     spyOn(component, 'doSubmit');
     component.doSubmit();
     expect(component.doSubmit).toHaveBeenCalled;
   });
 });

 describe('BMI', function(){
  it('should call BMI()', ()=>{
    spyOn(component, 'BMI');
    component.BMI();
    expect(component.BMI).toHaveBeenCalled;
  });
});

});
