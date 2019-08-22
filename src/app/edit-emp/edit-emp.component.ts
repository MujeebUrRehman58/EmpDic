import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service'
import { ActivatedRoute, Router } from '@angular/router';
import { Employee } from '../models/emp'
import { User } from '../models/user'
import { Department } from '../models/dept'

@Component({
  selector: 'app-edit-emp',
  templateUrl: './edit-emp.component.html',
  styleUrls: ['./edit-emp.component.css']
})

export class EditEmpComponent implements OnInit {
  regx = "^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$"; 
  levels = ['Admin', 'Employee'];
  titles = ['Director', 'Sr. Developer', 'Jr. Developer', 'Software Engineer', 'Intern'];
  fileToUpload: File = null;
  id: any;
  mem: any = Employee
  user: any = User
  dept: any = Department
  depts: any;
  error: any
  
  constructor(
    private dataService: DataService,
    private route: ActivatedRoute,
    private router: Router,
  ) {

    this.id = this.route.snapshot.paramMap.get('id');
    this.dataService.getempbyid(this.id).then((emp) => {
      this.mem = emp;
      this.dataService.getdeptbyid(this.mem.dept).then((d) => {
        this.dept = d;
      });

    });
    this.dataService.getuserbyid(this.id).then((u) => {
      this.user = u;
    })
    this.dataService.getdepts().then((d) => {
      this.depts = d;
    });
  }

  ngOnInit() {
  }
  usernameExists() {
    this.dataService.userexists({ 'username': this.user.username, 'id': this.id }).subscribe((res: Response) => {
      if(res.status)
        this.error = 'Username already taken.'
      else
        this.error = null
    })
  }
  handleFileInput(files: FileList) {
    this.fileToUpload = files.item(0);
}
  onSubmit(value) {
    //console.log(value)
    if (value == 'cancel') {
      this.router.navigate(['/members'])
    }
    else if (value == 'delete') {
      this.dataService.deleteemp(this.id).subscribe((res: Response) => {
        this.router.navigate(['/members'])
      })
    } 
    else {
      this.dataService.getdeptbyname({'dept_name':value.dept}).subscribe((res: Response) => {
        value.dept = res
        if (this.mem.manOfMonth)
          this.dataService.set_manofmonth()
        this.dataService.patchuser(this.id, { 'username': value.username })
        
        if (this.fileToUpload){
          const formData: FormData = new FormData();
          formData.append('profile', this.fileToUpload, this.fileToUpload.name);
          this.dataService.patchemp(this.id, value).subscribe((res: Response) => {
            this.dataService.patchemp(this.id, formData).subscribe((res: Response) => {
              this.router.navigate(['/members'])  
            })
          })
        }
        else
          this.dataService.patchemp(this.id, value).subscribe((res: Response) => {
            this.router.navigate(['/members']) 
          })
      })
    }
  }
}
