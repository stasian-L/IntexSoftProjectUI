import { Injectable } from '@angular/core';
import { delay, Observable, of, tap } from 'rxjs';
import { UserModel } from '../models/user.model';
import { HttpClient } from '@angular/common/http';

@Injectable({
   providedIn: 'root'
})
export class AuthService {

   constructor(private http: HttpClient) { }

   isUserLoggedIn: boolean = false;
   private url = 'http://localhost:8080';

   login(userName?: string, password?: string): Observable<UserModel> {
      return this.http.post<UserModel>(this.url + '/sign-in', { userName, password });

      // this.isUserLoggedIn = userName == 'admin' && password == 'admin';
      // localStorage.setItem('isUserLoggedIn', this.isUserLoggedIn ? "true" : "false");

      // return of(this.isUserLoggedIn).pipe(
      //    delay(1000),
      //    tap(val => {
      //       console.log("Is User Authentication is successful: " + val);
      //    })
      // );
   }

   register(username: string, email: string, password: string) {
      return this.http.post<UserModel>(`${this.url}/sign-up`, { username, email, password });
   }

   logout(): void {
      this.isUserLoggedIn = false;
      localStorage.removeItem('isUserLoggedIn');
   }
}
