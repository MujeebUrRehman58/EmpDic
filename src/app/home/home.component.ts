import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service'
import { Router } from '@angular/router';



@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  emps: any;

  constructor(private dataService: DataService,
    private router: Router,
  ) { }

  ngOnInit() {
    let res = this.dataService.getemps();
    res.then((data) => this.emps = data);
  }
  go(id) {
    console.log('redirecting')
    this.router.navigate(['/emp-details/' + id])
  }
}
