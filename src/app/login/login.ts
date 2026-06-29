import { Component } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormControl, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {CommonModule} from '@angular/common';
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  loginForm= new FormGroup(
    {
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('',[Validators.required, Validators.minLength(8)])
    }
  );
  errorMessage='';
  constructor(private router: Router){}
  login(): void{
    if(this.loginForm.invalid){
      this.loginForm.markAllAsTouched();
      return;
    }
    const email=this.loginForm.get('email')?.value;
    const password=this.loginForm.get('password')?.value;
    if(email === 'sneha@gmail.com' && password==='admin@123'){
      this.errorMessage='';
      this.router.navigate(['/dashboard']);
    }
    else{
      console.log('wrong credentials')
      this.errorMessage= 'invalid username or password';
    }
    
  }
  
  reset(): void{
    this.loginForm.reset();
    this.errorMessage='';
  }
}
