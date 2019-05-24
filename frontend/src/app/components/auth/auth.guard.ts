import { AuthService } from './../../services/auth.service';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(private authService: AuthService, private router: Router) { }
    canActivate(route: ActivatedRouteSnapshot,
                state: RouterStateSnapshot):
                boolean |UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
        // Информация о том, авторизован пользователь или нет получается из токена
        const isAuth = this.authService.getToken() !== null ? true : false;
        if (!isAuth) {
            this.router.navigate(['/signin']);
        }
        return isAuth;
    }

}
