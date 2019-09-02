import { Component, OnInit } from '@angular/core';
import { DepartmentDataService } from '../../../dataService/department.data.service';
import { EmployeeDataService } from '../../../dataService/employee.data.service';
import { UserDataService } from '../../../dataService/user.data.service'
import { ActivatedRoute, Router } from '@angular/router';
import { Employee } from '../../../models/employee'
import { User } from '../../../models/user'
import { Department } from '../../../models/department'
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-edit-emp',
  templateUrl: './edit-member.component.html',
  styleUrls: ['./edit-member.component.css']
})

export class EditMemberComponent implements OnInit {
  phoneRegx = '^[+]*[0-9]{10,15}$';
  emailRegx = '^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$';
  titles = ['Director', 'Sr. Developer', 'Jr. Developer', 'Software Engineer', 'Intern'];
  fileToUpload: File = null;
  id: string;
  member: Employee = new Employee();
  user: User = new User();
  department: Department = new Department();
  departments: [Department] = null;
  usernameError: string;
  serverError: string;

  constructor(
    private employeeDataService: EmployeeDataService,
    private departmentDataService: DepartmentDataService,
    private userDataService: UserDataService,
    private route: ActivatedRoute,
    private router: Router,
  ) { }

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id');
    this.departmentDataService.getDepartments().subscribe((d: [Department]) => {
      this.departments = d;
    });
    this.employeeDataService.getEmploeeById(this.id).subscribe((e: Employee) => {
      this.member = e;
      this.departmentDataService.getDepartmentById(this.member.department_id).subscribe((d: Department) => {
        this.department = d;
        this.userDataService.getUserById(e.user_id).subscribe((u: User) => {
          this.user = u;
        });
      });
    });
  }
  DoesUsernameExist() {
    this.userDataService.doesUserExist({ 'username': this.user.username, 'id': this.member.user_id }).subscribe((u: [User]) => {
      if (u.length < 1){
        this.usernameError = null;
      } else {
        this.usernameError = 'Username already taken.';
      }
    });
  }

  handleFileInput(files: FileList, form: NgForm) {
    this.fileToUpload = files.item(0);
    form.controls.address.markAsDirty();
  }

  onSubmit(value) {
    if (value === 'cancel') {
      this.router.navigate(['/members']);
    } else if (value === 'delete') {
      if (confirm('Are you sure you want to delete this member?')) {
        this.userDataService.deleteUser(this.member.user_id).subscribe(() => {
          this.router.navigate(['/members']);
        });
      } else {
        return;
      }
    } else {
      this.employeeDataService.putEmployee(this.id, value).subscribe((e: Employee) => {
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
        this.serverError = error;
      });
    }
  }
}
