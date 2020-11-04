import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-weight',
  templateUrl: './weight.component.html',
  styleUrls: ['./weight.component.css']
})
export class WeightComponent implements OnInit {

  iniWeight: any; //Initial weight
  goalWeight: any;//Goal weight
  changedWeight: any;//current weight
  differ: any;//the difference between current and initial weight
  remaining: any;//the remaining amount of weight needed
  height: any//how tall a person is
  bmi: any// the value for the calculated BMI
  goodValueI: any//checks to make sure the initial weight are valid
  goodValueG: any//checks to make sure the goal weight is valid
  goodValueC: any//checks to make sure the current weight is valid
  goodValueH: any//checks to make sure the Height is valid
  useI: any//checks if Initial weight was inputed
  useG: any//checks if goal weight was inputed
  useC: any//checks if current weight was inputed 
  useH: any//checks if height was inputed
  constructor() { }

  
  ngOnInit(): void {
    this.iniWeight = 0;//the users initial weight
    this.goalWeight = 0;//the goal weight
    this.changedWeight = 0;//The current weight
    this.differ = this.changedWeight - this.iniWeight; //actual weight increase, differ increase
    this.remaining = this.goalWeight - this.changedWeight; //how much fat still need to lose
  }


  /** doSubmit: Calculates information provided
  * Calculates information provided by using to see where they are from the goal
  * @pre none
  * @post gives the user and alert as to where they are in terms of progress 
  * @param finds the difference and remainder 
  * @throw non
  * @return none
  */
  doSubmit(): any{
    //goal reach
    if(this.useI==false || this.useG==false || this.useC==false)
    {
      alert("Please input needed values!");
    }
    else if(this.useI==true && this.useG==true && this.useC==true){
    if(this.goodValueI==false || this.goodValueG==false || this.goodValueC==false){
      alert("Please fix your invalid values");
    }
    else{
    this.differ=this.changedWeight - this.iniWeight;
    this.remaining=this.changedWeight-this.goalWeight;
    document.getElementById("differ").innerText="Weight Difference: " + this.differ;
    if(this.remaining == 0 ){
      alert("Congrats, you have reach the goal!");
    }
    //not reach the goal
    else{
      //get fat
      if(this.differ > 0){
        alert("You seemed to have gained weight " + this.differ + " lbs");
      }
      //
      else if(this.differ < 0 && this.remaining > 0){
        alert("You still need to lose " + this.remaining + " lbs");
      }
      else if(this.remaining < 0)
      {
        alert("You have gone past your goal Congradulations");
      }
      else{
        alert("Your weight has not changed.");
        alert("You still need to lose " + this.remaining + " lbs");
      }
    }
   }
  }
  }

  BMI(): any{
    if(this.useC==false || this.useH==false)
    {
      alert("Please input the required values!");
    }
    else if(this.useC==true && this.useH==true){
    if(this.goodValueC==false || this.goodValueH==false)
    {
      alert("Please fix your invalid values");
    }
    else{
    this.bmi=(this.changedWeight/(this.height*this.height))*703;
    if(this.bmi>25.0)
    {
     alert("You are Overweight!");
     alert("Recommendations: Eat healthier foods and exercise");
    }
    else if(this.bmi<18.5)
    {
      alert("You are underweight!");
      alert("Recommendations: Try eating alittle more");
    }
    else
    {
      alert("Your BMI Index is good Great Job!");
    }
   }
  }
  }
  /** updateIni: Saves Initial weight
  * Saves the initial weight given by the user
  * @pre the info entered by the user
  * @post none 
  * @param saves initial weight 
  * @throw none
  * @return none
  */
 updateIni(event: any)
 {
   if(event.target.value<0){
    document.getElementById("ini").innerText="Initial Weight: Invalid";
     alert("How could you have a weight less than 0? Please Try Again")
     this.goodValueI=false;
     this.useI=true;
   }
   else{
   this.iniWeight=event.target.value;
   document.getElementById("ini").innerText="Initial Weight: " + this.iniWeight;
   this.goodValueI=true;
   this.useI=true;
   }
 }


 /** updateG: saves the goal weight
  * Saves the goal weight given by the user
  * @pre the info entered by the user
  * @post none 
  * @param saves goal weight 
  * @throw none
  * @return none
  */
 updateG(event: any)
 {
   if(event.target.value<0){
    document.getElementById("goalW").innerText="Goal Weight: Invalid";
    alert("How do you expect to get to a weight below 0...or even at 0? Please Try Again")
     this.goodValueG=false;
     this.useG=true;
   }
   else{
   this.goalWeight=event.target.value;
   document.getElementById("goalW").innerText="Goal Weight: " + this.goalWeight;
   this.goodValueG=true;
   this.useG=true;
   }
 }

 /** updateC: saves current weight
  * Saves the Current weight given by the user
  * @pre the info entered by the user
  * @post none 
  * @param saves current weight 
  * @throw none
  * @return none
  */ 
 updateC(event: any)
 {
  if(event.target.value<0){
    document.getElementById("currentW").innerText="Current Weight: Invalid";
    alert("How did you manage to get a negative weight your clearly lying? Please Try Again")
     this.goodValueC=false;
     this.useC=true;
   }
   else{
   this.changedWeight=event.target.value;
   document.getElementById("currentW").innerText="Current Weight: " + this.changedWeight;
   this.goodValueC=true;
   this.useC=true;
   }
 }

 updateH(event: any)
 {
  if(event.target.value<0){
    document.getElementById("height").innerText="Height: Invalid";
    alert("What would being a negative height be? Please Try Again")
     this.goodValueH=false;
     this.useH=true;
   }
   else
   {
   this.height=event.target.value;
   document.getElementById("height").innerText="Height: " + this.height;
   this.goodValueH=true; 
   this.useH=true;
   }
 }
}




