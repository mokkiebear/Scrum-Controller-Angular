import { AuthService } from './auth.service';
import { HttpInterceptor, HttpRequest, HttpHandler } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    constructor(private authService: AuthService) { }

    intercept(req: HttpRequest<any>, next: HttpHandler) {
        const authToken = this.authService.getToken();
        // Если токена в LS нет, то посылаем обычный запрос, который сервак забракует
        if (authToken === null) {
            return next.handle(req);
        }
        // Если токен есть, добавляем в заголовки и посылем измененный запрос
        const authRequest = req.clone({
            headers: req.headers.set('Authorization', authToken)
        });
        return next.handle(authRequest);
    }
}
