import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UriBuilderService } from '../../shared/services/uri-builder.service';
import { Observable } from 'rxjs';
import { createAuthorizationHeaders } from '../../shared/services/utils';
import { RecipeResponse } from '../../models/RecipeResponse';

@Injectable({
  providedIn: 'root',
})
export class RecipeService {
  private http: HttpClient = inject(HttpClient);
  private uriBuilderService: UriBuilderService = inject(UriBuilderService);

  getAllRecipes(): Observable<RecipeResponse[]> {
    return this.http.get<RecipeResponse[]>(
      this.uriBuilderService.getApiUrl() + '/recipes',
      {
        headers: createAuthorizationHeaders(),
      },
    );
  }

  getRecipeById(recipeId: number): Observable<RecipeResponse> {
    return this.http.get<RecipeResponse>(
      this.uriBuilderService.getApiUrl() + `/recipes/${recipeId}`,
      {
        headers: createAuthorizationHeaders(),
      },
    );
  }

  getRecipesByTitle(title: string): Observable<RecipeResponse[]> {
    return this.http.get<RecipeResponse[]>(
      this.uriBuilderService.getApiUrl() + `/recipes/search/${title}`,
      {
        headers: createAuthorizationHeaders(),
      },
    );
  }
}
