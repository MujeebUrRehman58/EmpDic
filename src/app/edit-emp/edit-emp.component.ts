import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service'
import { ActivatedRoute, Router } from '@angular/router';
import { Employee } from '../models/emp'
import { User } from '../models/user'
import {Department} from '../models/dept'
import { NgForm } from '@angular/forms';
import { emptyScheduled } from 'rxjs/internal/observable/empty';



@Component({
  selector: 'app-edit-emp',
  templateUrl: './edit-emp.component.html',
  styleUrls: ['./edit-emp.component.css']
})

export class EditEmpComponent implements OnInit {
  editEmpForm;
  levels = ['Admin', 'Employee'];
  titles = ['Director', 'Sr. Developer', 'Jr. Developer', 'Software Engineer', 'Intern'];
  regx = "\+?1?\d{9,15}";
  id: any;
  mem: any = Employee
  user: any = User
  dept: any = Department
  depts: any;
  users: any;
  emps: any
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
    
    this.dataService.getusers().then((u) => {
      this.users = u;
    })
    
    this.dataService.getemps().then((e) => {
      this.emps = e;
    })
  }
  
  ngOnInit() {
  }
  usernameExists(username){
    this.dataService.userexists(username).subscribe((res: Response) => {
      console.log(res);
      if(res.status){
        return true
      }
      return false
    })
  }
  onSubmit(form: NgForm) {
    // console.log(value);
    // if (value == 'cancel') {
    //   this.router.navigate(['/administration'])
    // }
    // else if (value == 'delete') {
    //   this.dataService.deleteemp(this.id);
    //   this.router.navigate(['/administration'])
    // } else {
      console.log(form.value)
      if(this.mem.manOfMonth)
        this.dataService.set_manofmonth()
      // this.dataService.patchemp(this.id, value);
      // this.dataService.patchuser(this.id, { 'username': value['username'] })
      // this.router.navigate(['/administration'])
    // }
  }
}
