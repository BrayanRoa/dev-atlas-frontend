import { HttpClient, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { IRegisterRequest, ILoginSuccessResponse, ILoginRequest, IUser } from '../interfaces/auth.interfaces';
import { catchError, map, Observable, of, tap } from 'rxjs';
import { environment } from '../../../../environments/environment';

export type LoginResult = 'success' | 'invalid' | 'error';

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

  register(registerRequest: IRegisterRequest):Observable<string> {
    return this.http.post<ILoginSuccessResponse>(`${this.apiUrl}/register`, registerRequest).pipe(
      tap((response) => {
        this.saveToken(response.access_token);
        this._userInformation = response.user;
      }),
      map(()=> "success" as LoginResult)
    );
  }

  login(loginRequest: ILoginRequest):Observable<LoginResult> {
    return this.http.post<ILoginSuccessResponse>(`${this.apiUrl}/login`, loginRequest).pipe(
      tap((response) => {
        this.saveToken(response.access_token);
        this._userInformation = response.user;
      }),
      map(()=> "success" as LoginResult),
      catchError((error:HttpErrorResponse)=> {
        if(error.status === 401 || error.status === 400){
          return of("invalid" as LoginResult);
        }
        console.error("Error al iniciar sesión", error);
        return of("error" as LoginResult);
      })
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
