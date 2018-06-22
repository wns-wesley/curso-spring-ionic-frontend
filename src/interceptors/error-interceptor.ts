import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Observable } from "rxjs/Rx";


@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

    // Método que vai interceptar minha requisição e aplicar uma lógica nela
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        console.log("passouuuuuuuuuuuuuuu");
        return next.handle(req)
        .catch((error, caught) => {
            return Observable.throw(error);
        }) as any;
    }
}

//Declaração do provider para o interceptor funcionar, exigencia do Angular
export const ErrorInterceptorProvider = {
    provide: HTTP_INTERCEPTORS,
    useClass: ErrorInterceptor,
    multi: true,
};