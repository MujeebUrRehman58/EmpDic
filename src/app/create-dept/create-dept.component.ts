import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service'
import { Router } from '@angular/router';
import {Department} from '../models/dept'

@Component({
  selector: 'app-create-dept',
  templateUrl: './create-dept.component.html',
  styleUrls: ['./create-dept.component.css']
})
export class CreateDeptComponent implements OnInit {
  dept: any = Department;
  constructor(
              private dataService: DataService,
              private router: Router,
    ) {
  }
  onSubmit(name) {
    this.dataService.postdept(name).subscribe((res: Response) => {
      console.log(res);
      this.router.navigate(['/departments/'])
    })
  }
  ngOnInit() {
  }

}
