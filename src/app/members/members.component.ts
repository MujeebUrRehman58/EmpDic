import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service'
import { Router } from '@angular/router';

@Component({
  selector: 'app-members',
  templateUrl: './members.component.html',
  styleUrls: ['./members.component.css']
})
export class MembersComponent implements OnInit {
  mems: any;
  constructor(
    private dataService: DataService,
    private router: Router,
  ) { }

  ngOnInit() {
    let res = this.dataService.getemps();
    res.subscribe((data) => this.mems = data);
  }

}
