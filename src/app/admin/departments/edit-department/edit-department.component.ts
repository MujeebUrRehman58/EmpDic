import { Component, OnInit } from '@angular/core';
import { DepartmentDataService } from '../../../dataService/department.data.service'
import { ActivatedRoute, Router } from '@angular/router';
import { Department } from '../../../models/department'

@Component({
  selector: 'app-edit-dept',
  templateUrl: './edit-department.component.html',
  styleUrls: ['./edit-department.component.css']
})

export class EditDepartmentComponent implements OnInit {
  error: string;
  id: string;
  department: Department = new Department();
  regx = '^[a-zA-Z0-9]{3,15}$';

  constructor(
    private departmentDataService: DepartmentDataService,
    private route: ActivatedRoute,
    private router: Router,
  ) {
  }

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id');
    this.departmentDataService.getDepartmentById(this.id).subscribe((d: Department) => {
      this.department = d;
    });
  }

  doesDepartmentExist() {
    const data = {'department_name': this.department.department_name, 'id': this.id};
    this.departmentDataService.DoesDepartmentExist(data).subscribe((d: [Department]) => {
      if (d.length < 1) {
        this.error = null;
      } else {
        this.error = 'Department already exists.';
      }
    });
  }

  onSubmit(value) {
    if (value == 'cancel') {
      this.router.navigate(['/departments']);
    } else if (value == 'delete') {
      if (confirm('Are you sure you want to delete this member?')) {
        this.departmentDataService.deleteDepartment(this.id).subscribe((res: JSON) => {
          this.router.navigate(['/departments']);
        });
      } else {
        return;
      }
    } else {
      this.departmentDataService.patchDepartment(this.id, value).subscribe((d: Department) => {
        this.router.navigate(['/departments']);
      });
    }
  }
}
