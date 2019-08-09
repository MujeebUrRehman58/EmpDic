import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators} from '@angular/forms';
import { DataService } from '../data.service'
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-dept',
  templateUrl: './create-dept.component.html',
  styleUrls: ['./create-dept.component.css']
})
export class CreateDeptComponent implements OnInit {
  createDeptForm;
  constructor(private formBuilder: FormBuilder,
              private dataService: DataService,
              private router: Router,
    ) {
    this.createDeptForm = this.formBuilder.group({
      dept_name: '',
    });
  }
  onSubmit(name) {
    this.dataService.postdept(name);
    this.router.navigate(['/administration'])
  }
  ngOnInit() {
  }

}
