import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';
import { UserDataService } from '../dataService/user.data.service';
import { EmployeeDataService } from '../dataService/employee.data.service'
import { AuthService } from '../auth/auth.services';
import { User } from '../models/user';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  error: string;
  constructor(
    private formBuilder: FormBuilder,
    private userDataService: UserDataService,
    private employeeDataService: EmployeeDataService,
    private router: Router,
    private auth: AuthService
  ) {
    this.loginForm = this.formBuilder.group({
      username: '',
      password: '',
    });
  }

  ngOnInit() {
  }
  onSubmit(value) {
    this.userDataService.loginUser(value).subscribe((res: JSON) => {
      localStorage.setItem('access_token', res['access']);
      localStorage.setItem('refresh_token', res['refresh']);

      const jwtdata = res['access'].split('.')[1];
      const decodedJwtJsonData = window.atob(jwtdata);
      const decodedJwtData = JSON.parse(decodedJwtJsonData);
      const id = decodedJwtData.user_id;
      this.userDataService.getUserById(id).subscribe((u: User) => {
        localStorage.setItem('currentUser', JSON.stringify(u));
        this.auth.userSubject.next(JSON.parse(localStorage.getItem('currentUser')));
      });
      this.error = null;
      this.router.navigate(['/home']);
    },
      error => {
        this.error = 'Username or password is incorrect';
        console.log('error', error);
      }
    );
  }
}
