import { HttpHeaders } from '@angular/common/http';
import { UserStorageService } from './user-storage.service';

export const createAuthorizationHeaders = (): HttpHeaders => {
  return new HttpHeaders().set(
    'Authorization',
    'Bearer ' + UserStorageService.getUser()?.token,
  );
};
