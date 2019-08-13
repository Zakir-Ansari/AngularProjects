import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {


  data1 = {id: 1, name: "Ram",location:"Bangalore",email: "ram@mail.com",mobile: "9867512345"};
  data2 = {id: 2, name: "Raj",location:"Chennai",email: "raj@mail.com",mobile: "7867534521"};
  data3 = {id: 3, name: "Vinay",location:"Pune",email: "vinay@mail.com",mobile: "9975287450"};

  constructor() { }

  id:number;
  lastKey: number;
  totalNumberOfEmployees: number;


  getLastKey = function() {
    let tempArray = [];
    let arrayLength: number;
    let i: number = 1;
    let nextValue: Boolean = true;
    let invalidCount: number = 0;
    while(nextValue) {
      if(localStorage.getItem(i.toString())!= null) {
        tempArray.push(JSON.parse(localStorage.getItem(i.toString())));
      }
      else {
        invalidCount++;
      }

      if (invalidCount > 2){
          nextValue = false;
      }
      i++;
    }
    arrayLength = tempArray.length;
    let j:number = 0;
    this.lastKey = 0;
    while(j< arrayLength) {
      if(this.lastKey < tempArray[j].id) {
        this.lastKey = tempArray[j].id;
      }
      j++;
    }
  }

  employees = [];
  putInitialData= function() {
    if(localStorage.length == 0) {    //if localStorage is empty
    localStorage.setItem("1",JSON.stringify(this.data1));
    localStorage.setItem("2",JSON.stringify(this.data2));
    localStorage.setItem("3",JSON.stringify(this.data3));
    }
    this.getLastKey();
    let i:number = 1;
    while(i<= this.lastKey) {
      if(localStorage.getItem(i.toString()) !=null) {
        this.employees.push(JSON.parse(localStorage.getItem(i.toString())));
      }
      i++;
    }
    this.totalNumberOfEmployees = localStorage.length;
  }

  deleteEmployee = function(id) {
    localStorage.removeItem(id.toString());
    this.addEmployeeFromLocalStorageToArray();
  }

  addEmployeeFromLocalStorageToArray = function() {
    this.getLastKey();
    this.employees = [];
    let i:number = 1;

    while(i<= this.lastKey) {
      if(localStorage.getItem(i.toString()) !=null) {
        this.employees.push(JSON.parse(localStorage.getItem(i.toString())));
      }
      i++;
    }
    this.totalNumberOfEmployees = localStorage.length;    
  }


  //*********For Employee Details ****************
  public show:boolean = true;
  public buttonName:any = 'Back';
  employeeDetails = [];
  showEmployeeDetails = function(empID: number) {
    this.employeeDetails = [];
    this.show = !this.show;
    this.employeeDetails.push(JSON.parse(localStorage.getItem(empID.toString())));
  }
    //********************************************

  ngOnInit() {
    this.putInitialData();
  }

}
