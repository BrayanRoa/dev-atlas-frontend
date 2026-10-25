import { Component, inject, OnInit } from '@angular/core';

import { InputTextModule } from 'primeng/inputtext';
import { IftaLabelModule } from 'primeng/iftalabel';
import { ButtonModule } from 'primeng/button';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-login',
  imports: [
    InputTextModule,
    IftaLabelModule,
    ButtonModule,
    ReactiveFormsModule,
    ProgressSpinnerModule,
    ToastModule
  ],
  templateUrl: './login.html',
  styleUrl: './login.css',
  host: { class: 'block' },
  providers: [MessageService]
})
export class LoginComponent implements OnInit{

  loginForm!: FormGroup
  loading!:boolean

  private readonly messageService = inject(MessageService);

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
      next: () => {
        setTimeout(() => {
          this.loading = false;
          this.router.navigate(['/dashboard/topics']);
        }, 2000);
      },
      error: (error) => {
        setTimeout(() => {
          this.loading = false;
          const detail = error?.status === 400
            ? 'Credenciales incorrectas'
            : 'Error al iniciar sesión - Contacta con el administrador';
          this.messageService.add({ severity: 'error', summary: 'Error', detail });
        }, 2000);
      },
    });
  }
}
