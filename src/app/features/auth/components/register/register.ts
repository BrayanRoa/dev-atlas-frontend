import { Component, OnInit } from '@angular/core';

import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { AuthService } from '../../services/auth.service';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  imports: [InputTextModule, ButtonModule, ReactiveFormsModule],
  templateUrl: './register.html',
  styleUrl: './register.css',
  host: { class: 'block' },
})
export class RegisterComponent implements OnInit {

  registerForm!: FormGroup;

  constructor(private authService: AuthService) {}
  
  ngOnInit(): void {
    this.buildForm();
  }

  // Build the form
  buildForm(): void {
    this.registerForm = new FormGroup({
      firstName: new FormControl('', [Validators.required]),
      lastName: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(8)]),
    });
  }

  // Register the user
  register(): void {
    this.authService.register(this.registerForm.value).subscribe({
      next: (response) => {
        console.log(response);
      },
      error: (error) => {
        console.error(error);
      },
    });
  }
}
