import { Injectable } from '@angular/core';
import { catchError, map, mapTo, Observable, of, tap } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Tokens } from '../models/tokens.model';

@Injectable({
   providedIn: 'root'
})
export class AuthService {
   private readonly ACCES_TOKEN = 'JWT_TOKEN';
   private readonly REFRESH_TOKEN = 'REFRESH_TOKEN';
   private loggedUser: string | null;
   private url = 'http://localhost:8080';

   constructor(private http: HttpClient) { }

   login(data: string, password: string): Observable<boolean> {
      return this.http.post<any>(this.url + '/sign-in', { data, password })
         .pipe(
            tap(tokens => this.doLoginUser(data, tokens)),
            map(() => true),
            catchError(error => {
               alert(error.error);
               return of(false);
            }
            ));
   }

   logout(): Observable<boolean> {
      localStorage.removeItem('isUserLoggedIn');

      return this.http.post<any>(`${this.url}/logout`, {
         'refreshToken': this.getRefreshToken()
      }).pipe(
         tap(() => this.doLogoutUser()),
         map(() => true),
         catchError(error => {
            alert(error.error);
            return of(false);
         }));

   }

   doLoginUser(data: string, tokens: Tokens): void {
      this.loggedUser = data;
      this.storeTokens(tokens);
   }

   storeTokens(tokens: Tokens) {
      localStorage.setItem(this.ACCES_TOKEN, tokens.accesToken);
      localStorage.setItem(this.REFRESH_TOKEN, tokens.refreshToken);
   }

   register(username: string, email: string, password: string) {
      return this.http.post(`${this.url}/sign-up`, { username, email, password });
   }

   isLoggedIn() {
      return !!this.getAccesToken();
   }

   refreshToken() {
      return this.http.post<any>(`${this.url}/refresh`, {
         'refreshToken': this.getRefreshToken()
      }).pipe(tap((tokens: Tokens) => {
         this.storeAccesToken(tokens.accesToken);
      }));
   }

   storeAccesToken(accesToken: any) {
      localStorage.setItem(this.ACCES_TOKEN, accesToken);
   }

   getAccesToken(): string | null {
      return localStorage.getItem(this.ACCES_TOKEN);
   }

   doLogoutUser(): void {
      this.loggedUser = null;
      this.removeTokens();
   }

   removeTokens() {
      localStorage.removeItem(this.ACCES_TOKEN);
      localStorage.removeItem(this.REFRESH_TOKEN);
   }

   getRefreshToken() {
      return localStorage.getItem(this.REFRESH_TOKEN);
   }
}
