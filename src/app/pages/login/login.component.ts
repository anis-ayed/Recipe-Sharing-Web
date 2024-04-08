import { Component, inject, OnInit } from '@angular/core';
import { MatFormField } from '@angular/material/form-field';
import { MatIcon } from '@angular/material/icon';
import { MatInput } from '@angular/material/input';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AuthService } from '../../core/services/auth.service';
import { Api } from '../../shared/requests-api';
import { LoginResponse } from '../../models/LoginResponse';
import { LOGIN_ERROR, LOGIN_SUCCESS } from '../../shared/constants/messages';
import { UserStorageService } from '../../shared/services/user-storage.service';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [MatFormField, MatIcon, MatInput, ReactiveFormsModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  private formBuilder: FormBuilder = inject(FormBuilder);
  private authService: AuthService = inject(AuthService);
  private api: Api<LoginResponse> = new Api<LoginResponse>();
  private router: Router = inject(Router);

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: [
        '',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(32),
        ],
      ],
    });
  }

  onSubmit(): void {
    this.api
      .execute(this.authService.login(this.loginForm.value), {
        spinner: true,
        errorMessage: LOGIN_ERROR,
        successMessage: LOGIN_SUCCESS,
      })
      .subscribe(() => {
        if (UserStorageService.isAdminLoggedIn()) {
          this.router.navigateByUrl('/admin/dashboard');
        } else if (UserStorageService.isUserLoggedIn()) {
          this.router.navigateByUrl('/dashboard');
        } else {
          this.router.navigateByUrl('/register');
        }
      });
  }
}
