import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';

@Component({
  selector: 'app-edit-employee',
  templateUrl: './edit-employee.component.html',
  styleUrls: ['./edit-employee.component.css']
})
export class EditEmployeeComponent implements OnInit {

  id: number;
  lastKey: number;
  data: object = {};
  employees = [];
  exists = false;
  confirmationString = "Data has been updated..";
  employeeObject: object = {};
  locations : string[] = ['Bangalore', 'Pune', 'Chennai'];


  constructor(private router: Router, private route: ActivatedRoute) { }

  editEmployee(employee) {
    this.employeeObject = {
      "id": this.id,
      "name": employee.name,
      "location": employee.location,
      "email": employee.email,
      "mobile": employee.mobile
    };
    console.log("ID: got: "+this.id);
    localStorage.setItem(this.id.toString(), JSON.stringify(this.employeeObject));
    console.log("Data updated: "+localStorage.getItem(this.id.toString()));
    this.router.navigate(['/']);
  }

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

  getAllRecords = function() {
    this.getLastKey();
    let i:number = 1;
    while(i<= this.lastKey) {
      if(localStorage.getItem(i.toString()) !=null) {
        this.employees.push(JSON.parse(localStorage.getItem(i.toString())));
      }
      i++;
    }
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.id = +params['id'];
    });
    //To set lastKeyValue
    this.getAllRecords();

    for(var i = 0; i < this.employees.length; i++) {
      if(parseInt(this.employees[i].id) === this.id) {
        this.exists = true;
        this.data = this.employees[i];
        break;
      }
      else {
        this.exists = false;
      }
    }
  }

}
