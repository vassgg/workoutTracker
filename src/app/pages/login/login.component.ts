import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { AuthService } from '../../shared/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  loginForm = new FormGroup({
    email: new FormControl(''),
    password: new FormControl(''),
  });
  errorText: boolean = false;

  constructor(private authService: AuthService, private router: Router) {}

  login() {
    this.authService
      .login(
        this.loginForm.get('email')?.value as string,
        this.loginForm.get('password')?.value as string
      )
      .then((cred) => {
        console.log(cred);
        localStorage.setItem('user', JSON.stringify(cred.user));
        this.router.navigateByUrl('/home');
      })
      .catch((error) => {
        this.errorText = true;
      });
  }
}
