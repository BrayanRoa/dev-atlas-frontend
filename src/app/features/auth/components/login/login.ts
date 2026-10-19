import { Component, OnInit } from '@angular/core';

import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  imports: [
    InputTextModule,
    ButtonModule,
    ReactiveFormsModule
  ],
  templateUrl: './login.html',
  styleUrl: './login.css',
  host: { class: 'block' },
})
export class LoginComponent implements OnInit{

  loginForm!: FormGroup

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.buildForm();
  }

  buildForm(): void {
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(8)]),
    });
  }

  login(){
    this.authService.login(this.loginForm.value).subscribe({
      next: (response) => {
        console.log(response);
      },
      error: (error) => {
        console.error(error);
      },
    });
  }
}
