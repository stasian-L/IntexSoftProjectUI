import { Injectable } from '@angular/core';
import { delay, Observable, of, tap } from 'rxjs';
import { UserModel } from '../models/user.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';

const httpOptions = {
   headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
   providedIn: 'root'
})
export class AuthService {

   constructor(private http: HttpClient) { }

   isUserLoggedIn: boolean = false;
   private url = 'http://localhost:8080';

   login(username?: string, password?: string): Observable<UserModel> {
      this.isUserLoggedIn = true;

      return this.http.post<UserModel>(this.url + '/sign-in', { username, password }, httpOptions);

      // localStorage.setItem('isUserLoggedIn', this.isUserLoggedIn ? "true" : "false");

      // return of(this.isUserLoggedIn).pipe(
      //    delay(1000),
      //    tap(val => {
      //       console.log("Is User Authentication is successful: " + val);
      //    })
      // );
   }

   register(username: string, email: string, password: string) {
      this.isUserLoggedIn = true;
      return this.http.post<UserModel>(`${this.url}/sign-up`, { username, email, password }, httpOptions);
   }

   logout(): void {
      this.isUserLoggedIn = false;
      localStorage.removeItem('isUserLoggedIn');
   }
}
