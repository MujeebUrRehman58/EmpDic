import { Component, OnInit } from '@angular/core';
import { DepartmentDataService } from '../../../dataService/department.data.service'
import { EmployeeDataService } from '../../../dataService/employee.data.service'
import { UserDataService } from '../../../dataService/user.data.service'
import { Router } from '@angular/router';
import { Employee } from '../../../models/employee'
import { User } from '../../../models/user'
import { Department } from '../../../models/department'

@Component({
  selector: 'app-create-emp',
  templateUrl: './create-member.component.html',
  styleUrls: ['./create-member.component.css']
})

export class CreateMemberComponent implements OnInit {
  phoneRegx = '^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$';
  emailRegx = '^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$';
  levels = ['Admin', 'Employee'];
  titles = ['Director', 'Sr. Developer', 'Jr. Developer', 'Software Engineer', 'Intern'];
  fileToUpload: File = null;
  password1: string;
  password2: string;
  employee: Employee = new Employee();
  id: any;
  user: User = new User();
  department: Department = new Department();
  departments: [Department] = null;
  usernameError: string;
  passwordError: string;
  serverError: string;

  constructor(
    private employeeDataService: EmployeeDataService,
    private departmentDataService: DepartmentDataService,
    private userDataService: UserDataService,
    private router: Router,
  ) { }

  ngOnInit() {
    this.departmentDataService.getDepartments().subscribe((departments: [Department])  => {
      this.departments = departments;
    });
  }

  doesUsernameExist() {
    this.userDataService.doesUserExist({'username': this.user.username}).subscribe((users: [User]) => {
      if (users.length < 1) {
        this.usernameError = null;
      } else {
        this.usernameError = 'Username already taken.';
      }
    });
  }

  passwordCheck() {
    if (this.password1 !== this.password2) {
      this.passwordError = 'Passwords must match.';
    } else {
      this.passwordError = null;
      }
  }

  handleFileInput(files: FileList) {
    this.fileToUpload = files.item(0);
  }

  onSubmit(value) {
    value['department_id'] = value.department_id['id'];
    this.employeeDataService.postEmployee(value).subscribe((employee) => {
      this.id = employee['user_id'];
      if (this.fileToUpload) {
        const formData: FormData = new FormData();
        formData.append('profile', this.fileToUpload, this.fileToUpload.name);
        this.employeeDataService.patchEmployee(this.id, formData).subscribe(() => {
          this.router.navigate(['/members']);
        });
      } else {
        this.router.navigate(['/members']);
      }
    },
    error => {
      console.log(error);
      this.serverError = error;
    });
  }
}
