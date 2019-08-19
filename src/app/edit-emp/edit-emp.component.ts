import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { DataService } from '../data.service'
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl, FormGroup } from '@angular/forms'


@Component({
  selector: 'app-edit-emp',
  templateUrl: './edit-emp.component.html',
  styleUrls: ['./edit-emp.component.css']
})

export class EditEmpComponent implements OnInit {
  editEmpForm: FormGroup
  levels = ['Admin', 'Employee']
  titles = ['Director', 'Sr. Developer', 'Jr. Developer', 'Software Engineer', 'Intern']
  // editEmpForm; error; olduname; emps;
  // users; oldman; oldprofile; newprofile;
  // id; mem; depts; dept_id;
  // oldname; oldtitle; oldlevel;
  // olddept; oldaddress; oldemail;
  // oldwork; oldhome; oldcell;

  constructor(
    // private formBuilder: FormBuilder,
    private dataService: DataService,
    private route: ActivatedRoute,
    private router: Router,
  ) {
    this.editEmpForm = this.createFormGroup()
    // this.id = this.route.snapshot.paramMap.get('id');
    // this.dataService.getempbyid(this.id).subscribe((emp) => {
    //   this.mem = emp;
    //   this.oldname = emp['full_name']; this.oldtitle = emp['title']; this.oldlevel = emp['level'];
    //   this.olddept = emp['dept']; this.oldaddress = emp['address']; this.oldemail = emp['email'];
    //   this.oldwork = emp['work_phone']; this.oldhome = emp['home_phone']; this.oldcell = emp['cell_phone'];
    //   this.oldman = emp['manOfMonth']; this.oldprofile = emp['profile']
    // });
    // this.dataService.getdepts().subscribe((d) => {
    //   this.depts = d;
    // });
    // this.dataService.getusers().subscribe((u) => {
    //   this.users = u;
    // })
    // this.dataService.getuserbyid(this.id).subscribe((u) => {
    //   this.olduname = u['username'];
    // })
    // this.dataService.getemps().subscribe((e) => {
    //   this.emps = e;
    // })
    // this.editEmpForm = this.formBuilder.group({
    //   username: this.oldaddress, manOfMonth: this.oldman, profile: this.oldprofile,
    //   full_name: this.oldname, title: this.oldtitle, level: this.oldlevel,
    //   dept: this.olddept, address: this.oldaddress, email: this.oldemail,
    //   work_phone: this.oldwork, home_phone: this.oldhome, cell_phone: this.oldcell,
    // });

  }
  createFormGroup() {
    return new FormGroup({
      user: new FormGroup({
        username: new FormControl(),
      }),
      dept: new FormGroup({
        dept_name: new FormControl(),
      }),
      full_name: new FormControl(),
      title: new FormControl(),
      level: new FormControl(),
      address: new FormControl(),
      work_phone: new FormControl(),
      home_phone: new FormControl(),
      cell_phone: new FormControl(),
      manOfMonth: new FormControl(),
      profile: new FormControl(),
    })
  }
  ngOnInit() {
  }
  // fileProgress(fileInput: any) {
  //   this.newprofile = <File>fileInput.target.files[0];
  // }
  // onSubmit(value) {
  //   console.log(value);
  //   if (value == 'cancel') {
  //     this.router.navigate(['/administration'])
  //   }
  //   else if (value == 'delete') {
  //     this.dataService.deleteemp(this.id);
  //     this.router.navigate(['/administration'])
  //   } else {
  //     for (let i = 0; i < this.users.length; i++) {
  //       let user = this.users[i]
  //       if (user.id == this.id)
  //         continue;
  //       if (user.username == this.olduname) {
  //         this.error = 'username already exits'
  //         this.router.navigate(['/edit-emp/' + this.id])
  //         return;
  //       }
  //     }
  //     for (let index = 0; index < this.depts.length; index++) {
  //       let dept = this.depts[index]
  //       if (dept.dept_name == this.olddept) {
  //         this.dept_id = dept.id;
  //         break;
  //       }
  //     }
  //     value['dept'] = this.dept_id;
  //     if (value['manOfMonth']) {
  //       for (let i = 0; i < this.emps.length; i++) {
  //         let emp = this.emps[i];
  //         if (emp.user != this.id)
  //           this.dataService.patchemp(emp.user, { 'manOfMonth': false });
  //       }
  //     }
  //     if (this.newprofile) {
  //       value['profile'] = this.newprofile;
  //     }
  //     //console.log(value)
  //     this.dataService.patchemp(this.id, value);
  //     this.dataService.patchuser(this.id, { 'username': value['username'] })
  //     this.router.navigate(['/administration'])
  //   }
  // }
}
