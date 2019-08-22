import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service'
import { Router } from '@angular/router';
import { Employee } from '../models/emp'
import { User } from '../models/user'
import { Department } from '../models/dept'
import { ValueConverter } from '@angular/compiler/src/render3/view/template';


@Component({
  selector: 'app-create-emp',
  templateUrl: './create-emp.component.html',
  styleUrls: ['./create-emp.component.css']
})
export class CreateEmpComponent implements OnInit {
  regx = "^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$";
  levels = ['Admin', 'Employee'];
  titles = ['Director', 'Sr. Developer', 'Jr. Developer', 'Software Engineer', 'Intern'];
  fileToUpload: File = null;
  pass1; pass2;
  id: any
  emp: any = Employee
  user: any = User
  dept: any = Department
  depts: any;
  error: any

  constructor(
    private dataService: DataService,
    private router: Router,
  ) {
    this.dataService.getdepts().then((d) => {
      this.depts = d;
    });
  }

  ngOnInit() {
  }
  usernameExists() {
    this.dataService.userexists({ 'username': this.user.username }).subscribe((res: Response) => {
      if (res.status)
        this.error = 'Username already taken.'
      else
        this.error = null
    })
  }

  passwordCheck() {
    if (this.pass1 != this.pass2)
      this.error = 'Passwords must match..'
    else
      this.error = null
  }

  handleFileInput(files: FileList) {
    this.fileToUpload = files.item(0);
  }
  onSubmit(value) {
    this.dataService.getdeptbyname({ 'dept_name': value.dept }).subscribe((res: Response) => {
      value.dept = res // response = dept.id
      if (value.manOfMonth)
        this.dataService.set_manofmonth()
      else
        value.manOfMonth = false
      this.dataService.postuser({ 'username': value.username, 'password': value.password }).subscribe((res: Response) => {
        console.log(res);
        this.id = res['id']
        delete value['username']
        delete value['password']
        delete value['password1']
        value['user'] = this.id
        if (this.fileToUpload) {
          const formData: FormData = new FormData();
          formData.append('profile', this.fileToUpload, this.fileToUpload.name);
          this.dataService.postemp(value).subscribe((res: Response) => {
            this.dataService.patchemp(this.id, formData).subscribe((res: Response) => {
              this.router.navigate(['/members'])
            })
          })
        }
        else {
          console.log(value)
          this.dataService.postemp(value).subscribe((res: Response) => {
            this.router.navigate(['/members'])
          })
        }
      })
    })
  }
}
