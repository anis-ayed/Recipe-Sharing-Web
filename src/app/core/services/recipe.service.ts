import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UriBuilderService } from '../../shared/services/uri-builder.service';
import { Observable } from 'rxjs';
import { createAuthorizationHeaders } from '../../shared/services/utils';

@Injectable({
  providedIn: 'root',
})
export class RecipeService {
  private http: HttpClient = inject(HttpClient);
  private uriBuilderService: UriBuilderService = inject(UriBuilderService);

  getAllRecipes(): Observable<any[]> {
    return this.http.get<any[]>(
      this.uriBuilderService.getApiUrl() + '/recipes',
      {
        headers: createAuthorizationHeaders(),
      },
    );
  }
}
