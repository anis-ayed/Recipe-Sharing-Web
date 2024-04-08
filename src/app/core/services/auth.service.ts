import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { LoginRequest } from '../../models/LoginRequest';
import { map, Observable } from 'rxjs';
import { LoginResponse } from '../../models/LoginResponse';
import { UriBuilderService } from '../../shared/services/uri-builder.service';
import { UserStorageService } from '../../shared/services/user-storage.service';
import { RegisterUser } from '../../models/RegisterUser';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private http: HttpClient = inject(HttpClient);
  private userStorageService: UserStorageService = inject(UserStorageService);
  private uriBuilderService: UriBuilderService = inject(UriBuilderService);

  login(loginRequest: LoginRequest): Observable<any> {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http
      .post<LoginResponse>(
        this.uriBuilderService.getApiUrl() + '/login',
        loginRequest,
        {
          headers,
          observe: 'response',
        },
      )
      .pipe(
        map(response => {
          const loginResponse: LoginResponse | null = response.body;

          if (loginResponse) {
            this.userStorageService.saveUser(loginResponse);
            return true;
          }
          return false;
        }),
      );
  }

  register(user: RegisterUser): Observable<LoginResponse> {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.post<LoginResponse>(
      this.uriBuilderService.getApiUrl() + '/register',
      user,
      {
        headers,
      },
    );
  }
}
