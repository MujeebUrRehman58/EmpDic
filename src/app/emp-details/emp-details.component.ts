import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { ActivatedRoute} from '@angular/router';


@Component({
  selector: 'app-emp-details',
  templateUrl: './emp-details.component.html',
  styleUrls: ['./emp-details.component.css']
})
export class EmpDetailsComponent implements OnInit {
  emp : any;
  users: any;
  depts: any;
  id : any;
  constructor(private dataService: DataService,
    private route: ActivatedRoute,
    ) {
    this.id = this.route.snapshot.paramMap.get('id');
    this.dataService.getdepts().then((d)=>{
      this.depts = d
    })
   }

  ngOnInit() {
    let res = this.dataService.getempbyid(this.id);
    res.then((data) => this.emp = data);
  }


}
