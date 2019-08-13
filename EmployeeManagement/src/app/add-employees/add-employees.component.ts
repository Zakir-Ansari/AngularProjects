import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-employees',
  templateUrl: './add-employees.component.html',
  styleUrls: ['./add-employees.component.css']
})
export class AddEmployeesComponent implements OnInit {

  constructor(private router: Router, private route: ActivatedRoute) { }

  locations : string[] = ['Bangalore', 'Pune', 'Chennai'];

  confirmationString: string = "New Employee has been added! Go back to Employee List to view details.";
  isAdded: boolean = false;

  employeeObject: object = {};
  addNewEmployee = function(Employee) {
    console.log("Employee object: "+Employee.toString())
    let nextId: number = Object.keys(localStorage).length + 1;
    this.employeeObject = {
      "id":nextId,
      "name":Employee.name,
      "location":Employee.location,
      "email":Employee.email,
      "mobile":Employee.mobile
    }
    
    localStorage.setItem(nextId.toString(),JSON.stringify(this.employeeObject));
    this.isAdded = true;
    this.router.navigate(['/']);
  }

  ngOnInit() {
  }

}
