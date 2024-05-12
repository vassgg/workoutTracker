import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { AuthService } from '../../shared/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent implements OnInit {
  loginForm = new FormGroup({
    email: new FormControl(''),
    password: new FormControl(''),
  });
  currentUser = localStorage.getItem('user');
  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    if (this.currentUser) {
      this.router.navigate(['/']);
    }
  }

  login() {
    this.authService
      .login(
        this.loginForm.get('email')?.value as string,
        this.loginForm.get('password')?.value as string
      )
      .then((cred) => {
        console.log(cred);

        this.router.navigateByUrl('/home');
      })
      .catch((error) => {
        console.error(error);
      });
  }
}
