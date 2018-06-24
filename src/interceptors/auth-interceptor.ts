import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Observable } from "rxjs/Rx";
import { StorageService } from '../services/storage.service';
import { API_CONFIG } from '../config/api.config';


@Injectable()
export class AuthInterceptor implements HttpInterceptor {

    constructor(public storage: StorageService){}

    // Método que vai interceptar minha requisição e aplicar uma lógica nela
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        let localUser = this.storage.getLocalUser();
        let n = API_CONFIG.baseUrl.length;
        let requestToAPI = req.url.substring(0, n) == API_CONFIG.baseUrl;

        if (localUser && requestToAPI) {
            const authReq = req.clone({headers: req.headers.set('Authorization', 'Bearer ' + localUser.token)});
            return next.handle(authReq);
        } else {
            return next.handle(req);
        }
    }
}

//Declaração do provider para o interceptor funcionar, exigencia do Angular
export const AuthInterceptorProvider = {
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptor,
    multi: true,
};