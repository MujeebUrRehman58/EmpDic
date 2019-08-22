import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service'
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-members',
  templateUrl: './members.component.html',
  styleUrls: ['./members.component.css']
})
export class MembersComponent implements OnInit {
  mems: any;
  users: any;
  searchMemForm;
  options = ['Yes', 'No']
  constructor(
    private formBuilder: FormBuilder,
    private dataService: DataService,
  ) {
    this.dataService.getusers().then((u) => {
      this.users = u
    })
    this.searchMemForm = this.formBuilder.group({
      username: '',
      full_name: '',
      manOfMonth: ''
    });
   }

  ngOnInit() {
    let res = this.dataService.getemps();
    res.then((data) => this.mems = data);
  }
  onSubmit(value) {
    this.dataService.searchmem(value).subscribe((res: Response) => {
      console.log(res);
      this.mems = res
    })
  }
}
