import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { ExpenseService, Expenses } from '../expense.service';

@Component({
  selector: 'app-budget',
  templateUrl: './budget.component.html',
  styleUrls: ['./budget.component.css']
})
export class BudgetComponent implements OnInit {

  // Variable Declarations //

  incomeData: any;
  expenseData: any;
  result: Expenses[] = [];
  categoryList: any;
  ctemplist:any;
  tempcList: any;
  amount: number;
  income: number;
  itemp: number
  ctemp: String;
  expenseList: any;
  expense: number;
  totalexp: number;
  percent: number;
  save: number;
  categoryForm: FormGroup;
  temp: any;
  ivalid: boolean;
  evalid: boolean;
  svalid: boolean;
  saved: boolean;
  exist: boolean;
  margin: number;
  // Chart Colors
  iColors = {
    domain: ['#478559', '#0CFF00']
  }
  eColors = {
    domain: ['#B00000', '#FF2E00', '#901A00', '#CF3A29', '#6B2115', '#640404', '#9C2A2A' ]
  }


  /**
   * Constructor when the component is intialized. It calls for the creation of a form group.
   * @pre None
   * @post None
   * @param fb name for the form
   * @throws None
   * @returns None
   */
  constructor(fb: FormBuilder) {
    this.categoryForm = fb.group({
      category: new FormControl('', [Validators.required])
    })
    }

  /**
   * Function that activates when component is intialized. In this application it initializes all variables to default values.
   * @pre None
   * @post None
   * @throws None
   * @returns None
   */  
  ngOnInit(): void {
    this.amount = -1;
    this.income = 0;
    this.itemp = 0;
    this.categoryList = [];
    this.expenseList = [];
    this.ctemp = ''
    this.expense = -1;
    this.totalexp = 0;
    this.ivalid = false;
    this.evalid = false;
    this.percent = -1;
    this.svalid = false;
    this.exist = false;
  }

  // Income //

  /**
   * Used to update the bank account amount
   * @pre New amount for the bank account
   * @post Bank amount has been updated
   * @param event variable that is the user inputted value
   * @throws None
   * @returns None
   */
  updateAmount(event: any){
    if(event.target.value >= 0){
      this.amount = event.target.value;
    }
    else{
      this.amount = -1;
    } 
  }

  /**
   * Used to update the amount for an income
   * @pre New income amount needs to be added
   * @post Takes in that new income
   * @param event variable that is the user inputted value
   * @throws None
   * @returns None 
   */
  addIncome(event: any){
    if(event.target.value > 0){
      this.itemp = event.target.value;
    }
    else{
      this.itemp = 0;
    }
  }

  /**
   * Used to update the overall data for the user's income and calls a function to refresh the pie chart
   * @pre Need to update total income
   * @post Total income is now updated
   * @param val the amount of the new income
   * @throws None
   * @returns None 
   */
  updateIncome(val:number){
    if(val > 0){
      this.itemp = 0;
      this.income = +this.income + +val;
      console.log(this.income);
      if(this.percent > 0){
        this.updateSavings();
        this.checkSavings();
      }
      this.updateIncomeData();
    }
    else{
      this.itemp = 0;
      this.income = this.income;
      alert('Invalid action!\nYou need to input a positive dollar amount.');
    }
  }

  // Category //

  /**
   * Used to add a category of expense
   * @pre Need to add a new category of expense
   * @post Takes in that new category
   * @param event variable that is the user inputted string
   * @throws None
   * @returns None 
   */
  addCategory(event: any){
    this.ctemp = event.target.value;
  }

  /**
   * Used to update the list of categories in alphabetical order
   * @pre Need to update the list of categories
   * @post Now list of categories is updated
   * @param str the new category that is need to update the category list
   * @throws None
   * @returns None
   */
  updateCategoryList(str: String){
    this.ctemplist = [];
    for(let item of this.categoryList)
    {
      if(str === item)
      {
        this.exist = true;
      }
    }
    if(this.exist === false){
      for(let item of this.categoryList)
      {
        this.ctemplist.push(item);
      }
      this.ctemplist.push(str);
      this.categoryList = this.ctemplist.sort();
    }
    else{
      alert("Already a category!");
    }
    this.ctemp = '';
    this.exist = false;
  }

  // Expense //

  /**
   * Used to add an expense
   * @pre Need to add in an expense
   * @post Takes in that new expense
   * @param event variable that is user inputted value
   * @throws None
   * @returns None
   */
  addExpense(event:any){
    if(event.target.value >= 0){
      this.expense = event.target.value;
    }
    else{
      this.expense = -1;
    }
  }

  /**
   * Used to update the total expenses, calls a function to refresh the pie chart, and updates if a saving goal has been met
   * @pre Need to update the total expenditures
   * @post Now total expenditures has been updated
   * @throws None
   * @returns None
   */
  updateExpense(){
    if(this.categoryForm.valid && this.categoryForm.value.category !== 'Select one...' && this.expense >= 0){
      let i = 0;
      let update = false;
      for(let exp in this.expenseList){
        if(this.categoryForm.value.category === this.expenseList[i][0]){
          this.expenseList[i][1] = +this.expenseList[i][1] + +this.expense;
          update = true;
        }
        i++;
      }
      if(update === false){
        let etemp = this.expense
        console.log(this.expenseList);
        this.expenseList.push([this.categoryForm.value.category, etemp]);
      }
      this.expense=0;
      this.categoryForm.reset();
      this.tempcList = this.categoryList;
      this.categoryList= [];
      for( let tc of this.tempcList)
      {
      this.categoryList.push(tc);
      }
      console.log("expense list array");
      console.log(this.expenseList);
      this.result.length = 0;
      for(let exp of this.expenseList)
      {
        this.temp = Object.assign({name: exp[0], value: +exp[1]}); 
        this.result.push(this.temp); 
      }
      console.log("expense chart data");
      console.log(this.result);
      this.totalExpense(this.expenseList);
      this.updateExpenseData();
      this.checkSavings();
    }
    else if (this.categoryForm.invalid || this.categoryForm.value.category === 'Select one...'){
      this.expense = -1;
      alert('Invalid action!\nYou need to choose a category.');
    }
    else{
      alert('Invalid action!\nYou need to input a positive dollar amount.');
    }
  }

  /**
   * Used to calculate the total expense
   * @pre There is not an accurate summation of the expenses
   * @post An accurate of expenses
   * @param arr array of expense values
   * @throws None
   * @returns None
   */
  totalExpense(arr: any){
    this.totalexp = 0;
    for(let item of arr){
      console.log(arr);
      this.totalexp = +this.totalexp + +item[1];
    }
    console.log(this.totalexp);
  }

  // Savings //

  /**
   * Used to calculate the percentage of the savings
   * @pre There is a saving percent that user wants to add
   * @post Takes in that saving value and converts it into a percent/decimal value
   * @param event variable that is the user inputted value
   * @throws None
   * @returns None
   */
  addSavings(event:any){
    if(event.target.value >= 0){
      this.percent = (event.target.value/100);
    }
    else{
      this.percent = -1;
    }
  }

  /**
   * Used to update the savings amount the user wants to achieve and calculates if they have done that
   * @pre User want to save certain amount of money
   * @post Keeps track if the user has met the savings goal
   * @throws None
   * @returns None
   */
  updateSavings(){
    if(this.percent >=0)
    {
      this.save = +this.income * +this.percent;
      console.log(this.save);
      this.checkSavings();
    }
    else{
      alert('Invalid action!\nYou need to input a positive number.');
    }
  }

  /**
   * Used to check if savings goal has been met
   * @pre There is saving goal and the user needs to know if it has been met
   * @post The amount of the money the user has saved is calculated and updates a variable that will show the user how much they have saved
   * @throws None
   * @returns None
   */
  checkSavings(){
    if(this.save > 0){
      if( this.income > 0 && this.totalexp === 0){
        this.margin = this.income;
        this.svalid = true;
        this.saved = true;
      }
      else if(this.income > 0 && this.totalexp > 0){
        this.svalid = true;
        this.margin = (this.income - this.totalexp);
        if((this.income - this.totalexp) >= this.save){
          this.saved = true;
        }
        else{
          this.saved = false;
        }
      }
      else if (this.income === 0 && this.totalexp > 0){
        if(this.percent > 0){
          this.margin = (0- this.totalexp);
          this.svalid = true;
          this.saved = false;
        }
        else{
          this.svalid = false;
          this.saved = false;
        }
      }
    }
    else{
      this.svalid = false;
      this.saved = false;
    }
  }

  // Chart Data //

  /**
   * Updates the income pie chart
   * @pre Need to update the pie chart
   * @post Pie chart has been updated
   * @throws None
   * @returns None
   */
  updateIncomeData(){
    if(this.amount >= 0){ 
      this.ivalid = true;
      if(this.income > 0 && this.amount > 0){
        this.incomeData = [
          { name: "Bank" , value: +this.amount},
          { name: "Income" , value: +this.income}];
      }
      else if( this.amount <= 0 && this.income > 0){
        this.incomeData = [{ name: "Income" , value: +this.income}];
      }
      else{
        this.incomeData = [
          { name: "Bank" , value: +this.amount}];
      }
      console.log("income chart data");
      console.log(this.incomeData);
    }
    else
    {
      alert('Invalid action!\nYou need to input a positive dollar amount.');
    }
  }

  /**
   * Updates the expense pie chart
   * @pre Need to update the pie chart
   * @post Pie chart has been updated
   * @throws None
   * @returns None
   */
  updateExpenseData(){
    this.evalid = true;
    this.expenseData = this.result;
    this.expenseData = [...this.expenseData];
    console.log("shown expense chart data");
    console.log(this.expenseData);
  }
}
  