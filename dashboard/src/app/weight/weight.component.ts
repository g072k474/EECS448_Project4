import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-weight',
  templateUrl: './weight.component.html',
  styleUrls: ['./weight.component.css']
})
export class WeightComponent implements OnInit {
  legend: boolean = false;
  showLabels: boolean = true;
  animations: boolean = true;
  showYAxisLabel: boolean = true;
  gradient:boolean = false;
  xAxis: boolean = true;
  yAxis: boolean = true;
  yAxisLabel: string = 'pounds';
  array: any;
  timeline: boolean = true;
  count: number;
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
  getGoal: boolean//used in the chart, check the goal
  color: any // chart color
  weightData: any//chart data 
  series: any//chart data 
  yScaleMin: any//chart data
  yScaleMax:any //chart data
  constructor() { }

  
  ngOnInit(): void {
    this.yScaleMax = 200;
    this.yScaleMin = 50;
    this.array = [];
    for(var i = 0; i < 6; i++){
      this.array[i] = 0;
    }
    this.count = 0;
    this.iniWeight = 0;//the users initial weight
    this.goalWeight = 0;//the goal weight
    this.changedWeight = 0;//The current weight
    this.differ = this.changedWeight - this.iniWeight; //actual weight increase, differ increase
    this.remaining = this.goalWeight - this.changedWeight; //how much fat still need to lose
    this.color = { 
      domain: ["#E44D25", "#CFC0BB", "#7aa3e5", "#a8385d", "#aae3f5"]
    }
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
    this.count++;
    //goal reach
    if(this.goodValueI === false || this.goodValueG === false || this.goodValueC === false){
      alert('Please fix your invalid values');
    }
    else{
    this.differ = this.changedWeight - this.iniWeight;
    this.remaining = this.changedWeight - this.goalWeight;
    //chart data collection
    this.array[this.count] = this.changedWeight;
    this.updateChartData();
    document.getElementById('differ').innerText = 'Weight Difference: ' + this.differ;
    if(this.remaining === 0 ){
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

  BMI(): any{
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
   }
   else{
   this.iniWeight=event.target.value;
   document.getElementById("ini").innerText="Initial Weight: " + this.iniWeight;
   this.goodValueI=true;
   this.array[0] = this.iniWeight; // data for chart
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
   }
   else{
   this.goalWeight=event.target.value;
   document.getElementById("goalW").innerText="Goal Weight: " + this.goalWeight;
   this.goodValueG=true;
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
   }
   else{
   this.changedWeight=event.target.value;
   document.getElementById("currentW").innerText="Current Weight: " + this.changedWeight;
   this.goodValueC=true;
   }
 }

 updateH(event: any)
 {
  if(event.target.value<0){
    document.getElementById("height").innerText="Height: Invalid";
    alert("What would being a negative height be? Please Try Again")
     this.goodValueH=false;
   }
   else
   {
   this.height=event.target.value;
   document.getElementById("height").innerText="Height: " + this.height;
   this.goodValueH=true; 
   }
 }

  /** updateChartData: 
   * Update the weight vertical bar chart
   * @pre Need to update the Vertical Bar Chart
   * @post Vertical Bar Chart has been updated
   * @throw none
   * @return none
   */
  updateChartData(){
    console.log(this.array[0]);
    console.log(this.array[this.count]);
    console.log(this.count);
/*
    if(this.getGoal){
      this.weightData = [
        {name: "Initial Weight", value: this.iniWeight},
        {name: "Recent Weight", value: this.changedWeight},
        {name: "Goal Weight", value: this.goalWeight}
      ];
    }
    else{
      this.weightData = [
        {name: "Initial Weight", value: this.iniWeight},
        {name: "Goal Weight", value: this.goalWeight}
      ];
    }
  }*/
  this.weightData = [{
    'name': 'your weight change',
    'series' : [
    {
    'name': 'iniWeight',
    'value': this.array[0]
    },
    {
      'name': 'current weight 1',
      'value': this.array[1]
      },
      {
        'name': 'current weight 2',
        'value': this.array[2]
        },
        {
          'name': 'current weight 3',
          'value': this.array[3]
          },
          {
            'name': 'current weight 4',
            'value': this.array[4]
            },
            {
              'name': 'current weight 5',
              'value': this.array[5]
              }
  ]
}
  ]
}

}


