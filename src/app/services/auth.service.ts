import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, map, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly apiUrl = 'http://localhost:5165/api/medicine/Login';
  // private readonly dummyUserId = 'admin';
  // private readonly dummyPassword = 'admin';
  // private readonly dummyUserName = 'Arman Raza';
  // private readonly dummyUserPrivilege = 'admin';

  constructor(
    private http: HttpClient,
    private router: Router
  ) { }

  // login(userId: string, password: string): boolean {
  //   // Dummy authentication logic
  //   if (userId === this.dummyUserId && password === this.dummyPassword) {
  //     localStorage.setItem('userId', userId);
  //     localStorage.setItem('password', password);
  //     localStorage.setItem('userName', this.dummyUserName);
  //     localStorage.setItem('userPrivilege', this.dummyUserPrivilege);
  //     this.router.navigate(['/list']);
  //     return true;
  //   }
  //   return false;
  // }

  login(userId: string, password: string): Observable<boolean> {
    const loginData = {
      var_username: userId,
      var_password: password
    };

    return this.http.post<any>(this.apiUrl, loginData).pipe(
      map(response => {
        if (response && response.int_status_id === 1) {
          localStorage.setItem('userId', response.var_username);
          localStorage.setItem('userName', response.var_name);
          localStorage.setItem('userPrivilege', response.var_priviledge);
          localStorage.setItem('userStatus', response.int_status_id);
          this.router.navigate(['/list']);
          return true;
        }
        return false;
      }),
      catchError((error: HttpErrorResponse) => {
        if (error.status === 401 && error.error && error.error.message) {
          return throwError(error.error.message);
        }
        return throwError('Login failed');
      })
    );
  }

  logout(): void {
    localStorage.removeItem('userId');
    localStorage.removeItem('password');
    localStorage.removeItem('userName');
    localStorage.removeItem('userPrivilege');
    localStorage.removeItem('userStatus');
    this.router.navigate(['/auth']);
  }

  // isLoggedIn(): boolean {
  //   const userId = localStorage.getItem('userId');
  //   const password = localStorage.getItem('password');
  //   return userId === this.dummyUserId && password === this.dummyPassword;
  // }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('userId');
  }

  getUserDetails() {
    return {
      userId: localStorage.getItem('userId'),
      userName: localStorage.getItem('userName'),
      userPrivilege: localStorage.getItem('userPrivilege'),
      userStatus: localStorage.getItem('userStatus'),
    };
  }
}