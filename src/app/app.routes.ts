import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'characters',
    pathMatch: 'full'
  },
  {
    path: 'characters',
    loadComponent: () => import('./pages/characters/characters.page').then(m => m.CharactersPage)
  },

];
