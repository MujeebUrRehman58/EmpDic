import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { DataService } from '../data.service'
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-edit-dept',
  templateUrl: './edit-dept.component.html',
  styleUrls: ['./edit-dept.component.css']
})
export class EditDeptComponent implements OnInit {
  editDeptForm;
  id;
  oldname;
  constructor(private formBuilder: FormBuilder,
    private dataService: DataService,
    private route: ActivatedRoute,
    private router: Router,
  ) {
    this.editDeptForm = this.formBuilder.group({
      dept_name: '',
    });
    this.id = this.route.snapshot.paramMap.get('id');
    this.dataService.getdeptbyid(this.id).subscribe((dept) => {
      console.log(dept);
      this.oldname = dept['dept_name']
    });

  }

  ngOnInit() {
  }

  update(name) {
    this.dataService.patchdept(this.id, name);
    this.router.navigate(['/administration'])
  }
  delete(name) {
    this.dataService.deletedept(this.id);
    this.router.navigate(['/administration'])
  }
  cancel(name) {
    this.router.navigate(['/administration'])
  }
}