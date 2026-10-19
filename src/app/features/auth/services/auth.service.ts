import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RegisterRequest, LoginSuccessResponse, LoginRequest } from '../interfaces/auth.interfaces';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  private apiUrl = 'http://localhost:3000/api/auth';

  constructor(private http: HttpClient) {}

  register(registerRequest: RegisterRequest):Observable<string> {
    return this.http.post<string>(`${this.apiUrl}/register`, registerRequest);
  }

  login(loginRequest: LoginRequest):Observable<LoginSuccessResponse> {
    return this.http.post<LoginSuccessResponse>(`${this.apiUrl}/login`, loginRequest);
  }
}
