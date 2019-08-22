import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service'
import { Router } from '@angular/router';
import { FormBuilder } from '@angular/forms';




@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  emps: any;
  depts: any
  searchEmpForm;

  constructor(
    private formBuilder: FormBuilder,
    private dataService: DataService,
    private router: Router,
  ) {
    this.dataService.getdepts().then((d)=>{
      this.depts = d
    })

    this.searchEmpForm = this.formBuilder.group({
      dept_name: '',
      full_name: '',
      email: ''
    });
  }

  ngOnInit() {
    let res = this.dataService.getemps();
    res.then((data) => this.emps = data);
  }
  onSubmit(value) {
    console.log(value)
    this.dataService.searchemp(value).subscribe((res: Response) => {
      console.log(res);
      this.emps = res
    })
  }
}
