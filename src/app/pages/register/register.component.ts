import { Component, inject, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AuthService } from '../../core/services/auth.service';
import { Api } from '../../shared/requests-api';
import { LoginResponse } from '../../models/LoginResponse';
import { Router, RouterLink } from '@angular/router';
import {
  SNACKBAR_ACTION,
  SNACKBAR_ERROR_CONFIGURATION,
} from '../../shared/snackbarActions';
import { RegisterUser } from '../../models/RegisterUser';
import { MatSnackBar } from '@angular/material/snack-bar';
import {
  PASSWORD_NOT_MATCH,
  SIGN_UP_ERROR,
  SIGN_UP_SUCCESS,
} from '../../shared/constants/messages';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
})
export class RegisterComponent implements OnInit {
  registerForm!: FormGroup;
  private formBuilder: FormBuilder = inject(FormBuilder);
  private authService: AuthService = inject(AuthService);
  private api: Api<LoginResponse> = new Api<LoginResponse>();
  private router: Router = inject(Router);
  private snackbar: MatSnackBar = inject(MatSnackBar);

  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      firstname: ['', [Validators.required]],
      lastname: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: [
        '',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(32),
        ],
      ],
      confirmPassword: [
        '',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(32),
        ],
      ],
    });
  }

  onSubmit() {
    const { firstname, lastname, email, password, confirmPassword } =
      this.registerForm.value;
    const user: RegisterUser = {
      firstname,
      lastname,
      email,
      password,
    };
    if (password !== confirmPassword) {
      this.snackbar.open(
        PASSWORD_NOT_MATCH,
        SNACKBAR_ACTION.CLOSE,
        SNACKBAR_ERROR_CONFIGURATION,
      );
      return;
    }

    this.api
      .execute(this.authService.register(user), {
        successMessage: SIGN_UP_SUCCESS,
        errorMessage: SIGN_UP_ERROR,
      })
      .subscribe(() => this.router.navigateByUrl('/login'));
  }
}
