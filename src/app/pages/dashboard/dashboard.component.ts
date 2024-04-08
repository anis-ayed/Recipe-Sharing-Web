import { Component, inject, OnInit } from '@angular/core';
import { RecipeCardComponent } from '../../shared/components/recipe-card/recipe-card.component';
import { RecipeService } from '../../core/services/recipe.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [RecipeCardComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent implements OnInit {
  private recipeService: RecipeService = inject(RecipeService);

  ngOnInit(): void {
    this.recipeService.getAllRecipes().subscribe(console.log);
  }
}
