import { Injectable } from "@angular/core";
import { HttpInterceptor, HttpRequest, HttpHandler, HttpErrorResponse, HttpEvent } from "@angular/common/http";
import { AuthService } from "../services/auth.service";
import { BehaviorSubject, catchError, filter, Observable, switchMap, take, throwError } from "rxjs";

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
    private isRefreshing = false;
    private refreshTokenSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null);

    constructor(private authService: AuthService) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        if (this.authService.getAccesToken()) {
            request = this.addToken(request, this.authService.getAccesToken());
        }

        return next.handle(request).pipe(catchError(error => {
            if (error instanceof HttpErrorResponse && error.status === 401) {
                return this.handle401Error(request, next);
            } else {
                return throwError(() => new Error(error));
            }
        }));
    }

    addToken(request: HttpRequest<any>, token: string | null): HttpRequest<any> {
        return request.clone({
            setHeaders: {
                'Authorization': `Bearer ${token}`
            }
        });
    }

    handle401Error(request: HttpRequest<any>, next: HttpHandler) {
        if (!this.isRefreshing) {
            this.isRefreshing = true;
            this.refreshTokenSubject.next(null);

            return this.authService.refreshToken().pipe(
                switchMap((token: any) => {
                    this.isRefreshing = false;
                    this.refreshTokenSubject.next(token.accesToken);
                    return next.handle(this.addToken(request, token.accesToken));
                }));
        } else {
            return this.refreshTokenSubject.pipe(
                filter(token => token != null),
                take(1),
                switchMap(accesToken => {
                    return next.handle(this.addToken(request, accesToken));
                }));
        }
    }
}