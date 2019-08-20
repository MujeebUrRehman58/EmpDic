import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service'

@Component({
  selector: 'app-departments',
  templateUrl: './departments.component.html',
  styleUrls: ['./departments.component.css']
})
export class DepartmentsComponent implements OnInit {
  depts : any;
  constructor(private dataService: DataService,) { }

  ngOnInit() {
    let res = this.dataService.getdepts();
    res.then((data) => this.depts = data);
  }

}
