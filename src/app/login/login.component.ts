import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder } from '@angular/forms';
import { DataService } from '../data.service'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm;
  error;
  constructor(
    private formBuilder: FormBuilder,
    private dataService: DataService,
    private router: Router,
  ) { 
    this.loginForm = this.formBuilder.group({
      username: '',
      password: '',
    });
  }

  ngOnInit() {
  }
  onSubmit(value) {
    this.dataService.loginuser(value).subscribe((res: Response) => {
      localStorage.setItem('currentUser', JSON.stringify({ token: res['token'], name: name }));
      this.error = null
      this.router.navigate(['/home'])
    },
    error => {
      this.error = 'Username or password is incorrect'
      console.log('error', error)
    }
    )
  }
}
