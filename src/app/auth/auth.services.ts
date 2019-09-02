// src/app/auth/auth.service.t
import { Injectable } from '@angular/core';
import { Router } from '@angular/router'
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from '../models/user';


@Injectable()
export class AuthService {
    level: string;
    public userSubject: BehaviorSubject<User>;
    private user: Observable<User>;

    constructor(
        private router: Router,
    ){
        this.userSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
        this.user = this.userSubject.asObservable();
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
        localStorage.removeItem('currentUser');
        this.router.navigate(['/login']);
    }

    public isAdmin() {
        return this.user;
    }
}
