import { Component, OnInit } from '@angular/core';
import { DepartmentDataService } from '../../../dataService/department.data.service'
import { Router } from '@angular/router';
import {Department} from '../../../models/department'

@Component({
  selector: 'app-create-dept',
  templateUrl: './create-department.component.html',
  styleUrls: ['./create-department.component.css']
})
export class CreateDepartmentComponent implements OnInit {
  regx = '^[a-zA-Z0-9]{3,15}$';
  department: Department = new Department();
  error: string;
  constructor(
              private departmentDataService: DepartmentDataService,
              private router: Router,
    ) {}

  onSubmit(name) {
    this.departmentDataService.postDepartment(name).subscribe((d: Department) => {
      this.router.navigate(['/departments/']);
    },
    );
  }

  doesDepartmentExist() {
    const data = {'department_name': this.department.department_name};
    this.departmentDataService.DoesDepartmentExist(data).subscribe((d: [Department]) => {
      if (d.length < 1) {
        this.error = null;
      } else {
        this.error = 'Department already exists';
      }
    }
    );
  }

  ngOnInit() {
  }

}
