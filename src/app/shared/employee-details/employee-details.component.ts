import { Component, OnInit } from '@angular/core';
import { EmployeeDataService } from '../../dataService/employee.data.service';
import { DepartmentDataService } from '../../dataService/department.data.service'
import { ActivatedRoute} from '@angular/router';
import { Employee } from 'src/app/models/employee';
import { Department } from 'src/app/models/department';


@Component({
  selector: 'app-employee-details',
  templateUrl: './employee-details.component.html',
  styleUrls: ['./employee-details.component.css']
})
export class EmployeeDetailsComponent implements OnInit {
  employee: Employee = new Employee();
  departments: [Department] = null;
  id: string;
  constructor(
    private employeeDataService: EmployeeDataService,
    private departmentDataService: DepartmentDataService,
    private route: ActivatedRoute,
    ) {
   }

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id');
    this.employeeDataService.getEmploeeById(this.id).subscribe((e: Employee) => {
      this.employee = e;
      this.departmentDataService.getDepartments().subscribe((d: [Department]) => {
        this.departments = d;
      });
    });
  }


}
