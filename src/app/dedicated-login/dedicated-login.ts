import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  ReactiveFormsModule,
  FormGroup,
  FormControl,
  Validators
} from '@angular/forms';
import { Router } from '@angular/router';
import { AdminService } from '../services/admin';

@Component({
  selector: 'app-dedicated-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './dedicated-login.html',
  styleUrl: './dedicated-login.css'
})
export class DedicatedLogin {

  errorMessage = '';

  loginForm = new FormGroup({
    username: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required)
  });

  constructor(
    private adminService: AdminService,
    private router: Router
  ) {}

  login(): void {

    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }

    const username = this.loginForm.value.username!;
    const password = this.loginForm.value.password!;

    this.adminService.login(username, password).subscribe({

      next: (response) => {

        sessionStorage.setItem(
          'dedicatedAdmin',
          JSON.stringify(response.admin)
        );

        this.router.navigate(['/worker-verification']);

      },

      error: () => {
        this.errorMessage = 'Invalid username or password';
      }

    });

  }

}