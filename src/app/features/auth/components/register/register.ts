import { Component, OnInit } from '@angular/core';

import { InputTextModule } from 'primeng/inputtext';
import { IftaLabelModule } from 'primeng/iftalabel';
import { ButtonModule } from 'primeng/button';
import { AuthService } from '../../services/auth.service';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
@Component({
  selector: 'app-register',
  imports: [InputTextModule, IftaLabelModule, ButtonModule, ReactiveFormsModule, ToastModule],
  templateUrl: './register.html',
  styleUrl: './register.css',
  host: { class: 'block' },
  providers: [MessageService],
})
export class RegisterComponent implements OnInit {

  registerForm!: FormGroup;
  loading!: boolean;

  constructor(
    private authService: AuthService,
    private router: Router,
    private messageService: MessageService
  ) {}
  
  ngOnInit(): void {
    this.buildForm();
  }

  // Build the form
  buildForm(): void {
    this.registerForm = new FormGroup({
      firstName: new FormControl('', [Validators.required, Validators.minLength(3)]),
      lastName: new FormControl('', [Validators.required, Validators.minLength(3)]),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(8)]),
    });
  }

  // Register the user
  register(): void {
    this.loading = true;
    this.authService.register(this.registerForm.value).subscribe({
      next: (response) => {
        setTimeout(()=>{
          this.loading = false;
          this.router.navigate(['/dashboard/topics']);
        },2000)
      },
      error: (error) => {
        setTimeout(()=>{
          this.loading = false;
          if(error.error.message.includes("User already exists")){
            this.messageService.add({severity: 'error', summary: 'Error', detail: 'El correo electrónico ya está registrado'});
          }else{
            this.messageService.add({severity: 'error', summary: 'Error', detail: 'Error al registrar usuario'});
          }
        },2000)
      },
    });
  }
}
