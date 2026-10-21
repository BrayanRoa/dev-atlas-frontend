import { HttpClient, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RegisterRequest, LoginSuccessResponse, LoginRequest, User } from '../interfaces/auth.interfaces';
import { catchError, map, Observable, of, tap } from 'rxjs';

export type LoginResult = 'success' | 'invalid' | 'error';

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  private apiUrl = 'http://localhost:3000/api/auth';
  private tokenKey = '';
  private _userInformation:User | null = null;

  constructor(private http: HttpClient) {}

  private saveToken(token: string): void {
    localStorage.setItem(this.tokenKey, token);
  }

  hasToken(): boolean {
    return !!localStorage.getItem(this.tokenKey);
  }

  register(registerRequest: RegisterRequest):Observable<string> {
    return this.http.post<string>(`${this.apiUrl}/register`, registerRequest);
  }

  login(loginRequest: LoginRequest):Observable<LoginResult> {
    return this.http.post<LoginSuccessResponse>(`${this.apiUrl}/login`, loginRequest).pipe(
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

  get userInformation(): User | null {
    return this._userInformation;
  }
}
