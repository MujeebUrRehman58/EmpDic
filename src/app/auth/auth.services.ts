// src/app/auth/auth.service.t
import { Injectable } from '@angular/core';
import { Router } from '@angular/router'
import { BehaviorSubject, Observable } from 'rxjs';
import { Employee } from '../models/employee'


@Injectable()
export class AuthService {
    level: string;
    public employeeSubject: BehaviorSubject<Employee>;
    private employee: Observable<Employee>;

    constructor(
        private router: Router,
    ){
        this.employeeSubject = new BehaviorSubject<Employee>(JSON.parse(localStorage.getItem('currentEmployee')));
        this.employee = this.employeeSubject.asObservable();
    }

    public loggedIn(){
        if (localStorage.getItem('access_token')){
            return true;
        } else{
            return false;
        }
    }

    public logoutUser(){
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
        localStorage.removeItem('currentEmployee')
        this.router.navigate(['/login']);
    }

    public isAdmin() {
        return this.employee;
    }
}
