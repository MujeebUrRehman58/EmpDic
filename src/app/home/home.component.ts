import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service'


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  emps: any;
  
  constructor(private dataService: DataService,) { }

  ngOnInit() {
    let res = this.dataService.getemps();
    res.subscribe((data) => this.emps = data);
  }

}
