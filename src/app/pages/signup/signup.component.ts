import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { AuthService } from '../../shared/services/auth.service';
import { User } from '../../shared/models/User';
import { UserService } from '../../shared/services/user.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss'
})
export class SignupComponent {

  constructor(private authService: AuthService, private fp: FormBuilder, private userService: UserService) { }

  confirmPasswordValidator: ValidatorFn = (
    control: AbstractControl
  ): ValidationErrors | null => {
    return control.value.password === control.value.rePassword
      ? null
      : { PasswordNoMatch: true };
  };

  signUpForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(6)]),
    rePassword: new FormControl('', [Validators.required, Validators.minLength(6)]),
    username: new FormControl('', [Validators.required, Validators.minLength(6)]),
  }, { validators: [this.confirmPasswordValidator]});

  

  onSubmit() {
    if (this.signUpForm.valid) {
      this.authService.signup(this.signUpForm.get('email')?.value as string, this.signUpForm.get('password')?.value as string).then(cred => {
        console.log(cred);
        const user: User = {
          id: cred.user?.uid as string,
          email: this.signUpForm.get('email')?.value as string,
          username: this.signUpForm.get('username')?.value as string,
          profilePictureUrl: 'profilepictures/blank-profile-picture-973460_960_720.webp',
          follows: []
        }
        this.userService.create(user).then(_ => {
          console.log('User added successfully');
        }).catch(error =>{
          console.error(error);
        })
      }).catch(error => {
        console.error(error);
      })
    }
  }
}
