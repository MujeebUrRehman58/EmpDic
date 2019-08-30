import { Component, OnInit } from '@angular/core';
import { DepartmentDataService } from '../../../dataService/department.data.service'
import { Department } from 'src/app/models/department';

@Component({
  selector: 'app-departments',
  templateUrl: './departments.component.html',
  styleUrls: ['./departments.component.css']
})
export class DepartmentsComponent implements OnInit {
  departments: [Department] = null;
  constructor(
    private departmentDataService: DepartmentDataService,
    ) { }

  ngOnInit() {
    this.departmentDataService.getDepartments().subscribe((d: [Department]) => this.departments = d);
  }

}
