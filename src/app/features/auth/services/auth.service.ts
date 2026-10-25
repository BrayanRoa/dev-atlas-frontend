import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { IRegisterPayload, ILoginSuccessResponse, ILoginPayload, IUser, IRegisterSuccessResponse } from '../interfaces/auth.interfaces';
import { Observable, tap } from 'rxjs';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  private apiUrl = `${environment.apiUrl}/auth`;
  private readonly tokenKey = 'access_token';
  private _userInformation: IUser | null = null;
  private readonly http = inject(HttpClient);


  private saveToken(token: string): void {
    localStorage.setItem(this.tokenKey, token);
  }

  hasToken(): boolean {
    return !!localStorage.getItem(this.tokenKey);
  }

  register(registerRequest: IRegisterPayload): Observable<IRegisterSuccessResponse> {
    return this.http.post<IRegisterSuccessResponse>(`${this.apiUrl}/register`, registerRequest).pipe(
      tap((response) => {
        this.saveToken(response.access_token);
        this._userInformation = response.data;
      }),
    );
  }

  login(loginRequest: ILoginPayload): Observable<ILoginSuccessResponse> {
    return this.http.post<ILoginSuccessResponse>(`${this.apiUrl}/login`, loginRequest).pipe(
      tap((response) => {
        this.saveToken(response.access_token);
        this._userInformation = response.data;
      }),
    );
  }

  logout(): void {
    localStorage.removeItem(this.tokenKey);
    this._userInformation = null;
  }

  get userInformation(): IUser | null {
    return this._userInformation;
  }

  get token(): string | null {
    return localStorage.getItem(this.tokenKey);
  }
}
