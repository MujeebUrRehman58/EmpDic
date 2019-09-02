import { Component, OnInit } from '@angular/core';
import { UserDataService } from '../../../dataService/user.data.service';
import {EmployeeDataService} from '../../../dataService/employee.data.service'
import { FormBuilder } from '@angular/forms';
import { Employee } from 'src/app/models/employee';
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-members',
  templateUrl: './members.component.html',
  styleUrls: ['./members.component.css']
})
export class MembersComponent implements OnInit {
  members: [Employee] = null;
  users: [User] = null;
  searchMemberForm;
  options = ['Yes', 'No'];
  constructor(
    private formBuilder: FormBuilder,
    private employeeDataService: EmployeeDataService,
    private userDataService: UserDataService,
  ) {
    this.searchMemberForm = this.formBuilder.group({
      username: '',
      full_name: '',
      man_of_month: ''
    });
   }

  ngOnInit() {
    this.userDataService.getUsers().subscribe((u: [User]) => {
      this.users = u;
      this.employeeDataService.getEmployees().subscribe((e: [Employee]) => this.members = e);
    });
  }

  onSubmit(value) {
    this.employeeDataService.searchMember(value).subscribe((e: [Employee]) => {
      this.members = e;
    });
  }
}
