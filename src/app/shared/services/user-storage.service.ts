import { Injectable } from '@angular/core';
import { LoginResponse } from '../../models/LoginResponse';
import { UserRole } from '../../enums/UserRole';

const USER = 'recipe-user';

@Injectable({
  providedIn: 'root',
})
export class UserStorageService {
  public saveUser(user: LoginResponse): void {
    window.localStorage.removeItem(USER);
    window.localStorage.setItem(USER, JSON.stringify(user));
  }

  static getUser(): LoginResponse | null {
    if (localStorage.getItem(USER)) {
      const localStorageUser: string = localStorage.getItem(USER) as string;
      return JSON.parse(localStorageUser) as LoginResponse;
    } else return null;
  }

  static getUserId(): number {
    const user: LoginResponse | null = this.getUser();
    if (user) {
      return Number(user.userId);
    }
    return -1;
  }

  static getUserRole(): string {
    const user: LoginResponse | null = this.getUser();
    if (user) {
      return user.role;
    }
    return UserRole.USER;
  }

  static isAdminLoggedIn(): boolean {
    if (!this.getUser()) return false;
    return this.getUserRole() === UserRole.ADMIN;
  }

  static isUserLoggedIn(): boolean {
    if (!this.getUser()) return false;
    return this.getUserRole() === UserRole.USER;
  }

  static signOut(): void {
    window.localStorage.removeItem(USER);
  }
}
