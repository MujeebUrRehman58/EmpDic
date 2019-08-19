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
  id : any;
  constructor(private dataService: DataService,
    private route: ActivatedRoute,
    ) {
    this.id = this.route.snapshot.paramMap.get('id');
   }

  ngOnInit() {
    let res = this.dataService.getempbyid(this.id);
    res.subscribe((data) => this.emp = data);
  }


}
