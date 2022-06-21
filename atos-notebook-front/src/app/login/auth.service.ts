import { Injectable } from '@angular/core';
import { User } from '../user/user';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private _user!: User;
  private _token!: string;

  constructor(private httpClient: HttpClient) {

    this._user = new User();

   }

  public get getUser(): User {
    if (this._user != null) {

      return this._user;
    } else if (this._user == null && sessionStorage.getItem('usuario') != null) {

      this._user = JSON.parse(sessionStorage.getItem('usuario') || "[]") as User;

      return this._user;

    }

    return new User();
  }

  public get token(): any {
    if (this._token != null) {

      return this._token;
    } else if (this._token == null && sessionStorage.getItem('token') != null) {

      this._token = sessionStorage.getItem('token')!;

      return this._token;
    }

    return null;
  }

  login(user: User): Observable<any> {

    const urlEndpoint = 'http://localhost:8080/login';
    const email = user.email;
    const password = user.password;

    const body = { email, password }

    return this.httpClient.post<any>(urlEndpoint, body);

  }


  saveUser(accessToken: string): void {

    let payload = this.getDataToken(accessToken);

    this._user = new User();

    this._user.email = payload.email;
    this._user.rol = payload.rol;
    this._user.id = payload.id;
    this._user.name=payload.name;
    sessionStorage.setItem('usuario', JSON.stringify(this._user));
  }

  saveToken(accessToken: string): void {

    this._token = accessToken;
    sessionStorage.setItem('token', accessToken);
  }

  getDataToken(accessToken: string): any {

    if (accessToken != null) {
      return JSON.parse(atob(accessToken.split(".")[1]))
    }

    return null;
  }

  isAuthenticated(): boolean {

    let payload = null;

    payload = this.getDataToken(this.token);

    if (payload != null && payload.email.length > 0) {

      return true
    }
    else  {
       payload = null
       return false;
    }
  }

  logout(): void {

    window.sessionStorage.clear();
  }

  hasRole(role: string): boolean {

    let payload = null;

    payload = this.getDataToken(this.token);

    if (payload.rol.includes(role)) return true;

    return false;
  }

}
