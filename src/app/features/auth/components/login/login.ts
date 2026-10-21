import { Component, OnInit } from '@angular/core';

import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { LoginSuccessResponse } from '../../interfaces/auth.interfaces';
import { Router } from '@angular/router';
import { ProgressSpinnerModule } from 'primeng/progressspinner';

@Component({
  selector: 'app-login',
  imports: [
    InputTextModule,
    ButtonModule,
    ReactiveFormsModule,
    ProgressSpinnerModule
  ],
  templateUrl: './login.html',
  styleUrl: './login.css',
  host: { class: 'block' },
})
export class LoginComponent implements OnInit{

  loginForm!: FormGroup
  loading!:boolean

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loading = false;
    this.buildForm();
  }

  buildForm(): void {
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(8)]),
    });
  }

  onLogin(){
    this.loading = true;
    this.authService.login(this.loginForm.value).subscribe({
      next: (response:LoginSuccessResponse) => {
        setTimeout(() => {
          this.loading = false;
          localStorage.setItem('token', response.access_token);
          this.router.navigate(['/dashboard/topics']);
        }, 2000);
      },
      error: (error) => {
        console.error(error);
        this.loading = false;
        // this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Error al iniciar sesión' });
      },
    });
  }
}
