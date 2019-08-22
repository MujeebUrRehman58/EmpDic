import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service'
import { ActivatedRoute, Router } from '@angular/router';
import {Department} from '../models/dept'

@Component({
  selector: 'app-edit-dept',
  templateUrl: './edit-dept.component.html',
  styleUrls: ['./edit-dept.component.css']
})
export class EditDeptComponent implements OnInit {
  editDeptForm;
  id: any
  dept: any = Department
  constructor(
    private dataService: DataService,
    private route: ActivatedRoute,
    private router: Router,
  ) {
    this.id = this.route.snapshot.paramMap.get('id');
    this.dataService.getdeptbyid(this.id).then((dept) => {
      console.log(dept);
      this.dept = dept
    });
  }
  ngOnInit() {
  }
  onSubmit(value){ 
    if (value == 'cancel') {
      this.router.navigate(['/departments'])
    }
    else if (value == 'delete') {
      this.dataService.deletedept(this.id).subscribe((res: Response) => {
        console.log(res);
        this.router.navigate(['/departments'])
      })
    } else {
      this.dataService.patchdept(this.id, value).subscribe((res: Response) => {
        console.log(res);
        this.router.navigate(['/departments'])
      })
      
    }
  }
}
