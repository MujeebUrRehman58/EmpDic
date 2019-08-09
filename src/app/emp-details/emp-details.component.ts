import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service'


@Component({
  selector: 'app-emp-details',
  templateUrl: './emp-details.component.html',
  styleUrls: ['./emp-details.component.css']
})
export class EmpDetailsComponent implements OnInit {
  emp : any;
  constructor(private dataService: DataService,) { }

  ngOnInit() {
    let res = this.dataService.getempbyid(1);
    res.subscribe((data) => this.emp = data);
  }

}
