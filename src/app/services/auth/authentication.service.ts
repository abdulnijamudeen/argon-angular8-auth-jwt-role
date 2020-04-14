import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { User } from '../../models/user';


@Injectable({ providedIn: 'root' })
export class AuthenticationService {
  private currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;

  constructor(private http: HttpClient) {
    this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): User {
    return this.currentUserSubject.value;
  }

  login(username: string, password: string) {
    return this.http.post<any>(`${environment.apiUrl}/api/auth/login?username=${username}&password=${password}`, { username, password })
      .pipe(map(user => {
        if (user && user.token) {
          localStorage.setItem('currentUser', JSON.stringify(user));
          this.currentUserSubject.next(user);
        }
        return user;
      }));
  }

  register(username: string, password: string, role: string, name: string) {
    return this.http.post<any>(`${environment.apiUrl}/api/auth/sign-up`, { username, password, role, name })
      .pipe(map(res => {
        if (res && res.message) {
          // console.log(res);
        }
        return res;
      }));
  }

  logout() {
    return this.http.post<any>(`${environment.apiUrl}/api/auth/logout`, {})
      .pipe(map(res => {
        if (res && res.message) {
          // console.log(res);
          localStorage.removeItem('currentUser');
          this.currentUserSubject.next(null);
        }
        return res;
      }));
  }
}
