import {
  Component,
  inject,
  OnInit,
  signal,
  WritableSignal,
} from '@angular/core';
import { RecipeCardComponent } from '../../shared/components/recipe-card/recipe-card.component';
import { RecipeService } from '../../core/services/recipe.service';
import { RecipeResponse } from '../../models/RecipeResponse';
import { MatGridList, MatGridTile } from '@angular/material/grid-list';
import { AlertErrorComponent } from '../../shared/components/alert-error/alert-error.component';
import { Api } from '../../shared/requests-api';
import { GET_ITEMS_ERROR } from '../../shared/constants/messages';
import {
  MatFormField,
  MatLabel,
  MatSuffix,
} from '@angular/material/form-field';
import { MatIcon } from '@angular/material/icon';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatInput } from '@angular/material/input';
import { MatButton } from '@angular/material/button';
import { debounceTime, delay, of, switchMap } from 'rxjs';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    RecipeCardComponent,
    MatGridList,
    MatGridTile,
    AlertErrorComponent,
    MatFormField,
    MatIcon,
    ReactiveFormsModule,
    MatInput,
    MatButton,
    MatLabel,
    MatSuffix,
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent implements OnInit {
  private recipeService: RecipeService = inject(RecipeService);
  recipes: WritableSignal<RecipeResponse[]> = signal<RecipeResponse[]>([]);
  api: Api<RecipeResponse[]> = new Api<RecipeResponse[]>();
  searchRecipesForm!: FormGroup;
  private formBuilder: FormBuilder = inject(FormBuilder);

  initSearchForm(): void {
    this.searchRecipesForm = this.formBuilder.group({
      searchInput: [null, [Validators.required]],
    });
  }

  searchRecipes(): void {
    const searchTerm = this.searchRecipesForm.get('searchInput')?.value;
    if (searchTerm) {
      this.api
        .execute(this.recipeService.getRecipesByTitle(searchTerm), {
          errorMessage: GET_ITEMS_ERROR.replace('#', 'recipes'),
        })
        .subscribe((data: RecipeResponse[]) => this.recipes.set(data));
    } else {
      this.getAllRecipes();
    }
  }

  getAllRecipes(): void {
    this.api
      .execute(this.recipeService.getAllRecipes(), {
        spinner: true,
        errorMessage: GET_ITEMS_ERROR.replace('#', 'recipes'),
      })
      .subscribe(recipes => this.recipes.set(recipes));
  }

  ngOnInit(): void {
    this.initSearchForm();
    this.getAllRecipes();
    this.searchRecipesForm
      .get('searchInput')
      ?.valueChanges.pipe(
        debounceTime(300),
        switchMap(searchTerm => {
          return of(searchTerm).pipe(delay(500));
        }),
      )
      .subscribe(() => {
        this.searchRecipes();
      });
  }
}
