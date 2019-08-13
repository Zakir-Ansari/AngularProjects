import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms'
import { RouterModule } from '@angular/router'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { AddEmployeesComponent } from './add-employees/add-employees.component';
import { EditEmployeeComponent } from './edit-employee/edit-employee.component';
import { FilterPipe } from './filter.pipe';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AddEmployeesComponent,
    EditEmployeeComponent,
    FilterPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    RouterModule.forRoot ([
      {path: '' , redirectTo:'/employees',pathMatch:'full'},
      {path: '*/addEmployee' , redirectTo:'/addEmployee',pathMatch:'full'},
      {path: "employees", component: HomeComponent},
      {path: "addEmployee",component: AddEmployeesComponent},
      {path: "editEmployee/:id", component: EditEmployeeComponent}
    ])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }