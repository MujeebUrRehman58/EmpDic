import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthService } from './auth.services';
import { map } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
    constructor(
        private router: Router,
        private authenticationService: AuthService
    ) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        return this.authenticationService.isAdmin().pipe(map(res => {
            console.log(res);
            if (res.level === 'Admin') {
                return true;
            } else {
                this.router.navigate(['/home']);
                return false;
            }
        }));
    }
}