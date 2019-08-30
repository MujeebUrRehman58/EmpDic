import { Component, OnInit } from '@angular/core';
import { EmployeeDataService } from '../../dataService/employee.data.service'
import { DepartmentDataService } from '../../dataService/department.data.service'
import { FormBuilder } from '@angular/forms';
import { Employee } from 'src/app/models/employee';
import { Department } from 'src/app/models/department';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit {
  employees: [Employee] = null;
  departments: [Department] = null;
  manOfMonth: Employee = new Employee();
  searchEmployeeForm;

  constructor(
    private formBuilder: FormBuilder,
    private employeeDataService: EmployeeDataService,
    private departmentDataService: DepartmentDataService,
  ) {

    this.searchEmployeeForm = this.formBuilder.group({
      department_name: '',
      full_name: '',
      email: ''
    });
  }

  ngOnInit() {
    this.employeeDataService.getEmployees().subscribe((e: [Employee]) => {
      this.employees = e;
      this.departmentDataService.getDepartments().subscribe((d: [Department]) => {
        this.departments = d;
        this.employeeDataService.searchManOfMonth({'man_of_month': true}).subscribe((man: [Employee]) => {
          if (man.length < 1) {
            this.manOfMonth = null;
          } else {
            this.manOfMonth = man[0];
          }
        });
      });
    });
  }
  onSubmit(value) {
    this.employeeDataService.searchEmployee(value).subscribe((e: [Employee]) => {
      console.log(e);
      this.employees = e;
    })
  }
}
