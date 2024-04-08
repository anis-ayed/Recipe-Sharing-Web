import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class UriBuilderService {
  getApiUrl(): string {
    return `${environment.apiUri}:${environment.port}/${environment.baseUri}`;
  }
}
