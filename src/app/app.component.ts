import { Component } from '@angular/core';
import {AuthService} from './auth/auth.services'
import {Title} from "@angular/platform-browser";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']

})
export class AppComponent {
  title = 'Employee Dictionary';

  constructor(
    private authservice: AuthService,
    private titleService:Title,
    ){
      this.titleService.setTitle(this.title);
    }
}
