import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  {
    path: 'dashboard',
    loadComponent: () =>
      import('../app/pages/dashboard/dashboard.component').then(
        c => c.DashboardComponent,
      ),
  },
  {
    path: 'login',
    loadComponent: () =>
      import('../app/pages/login/login.component').then(c => c.LoginComponent),
  },
  {
    path: 'register',
    loadComponent: () =>
      import('../app/pages/register/register.component').then(
        c => c.RegisterComponent,
      ),
  },
  {
    path: 'recipe/:id',
    loadComponent: () =>
      import('../app/pages/recipe-details/recipe-details.component').then(
        c => c.RecipeDetailsComponent,
      ),
  },
  { path: '**', redirectTo: 'dashboard', pathMatch: 'full' },
];
