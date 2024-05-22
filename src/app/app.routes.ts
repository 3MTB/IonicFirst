import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'main',
    loadComponent: () => import('./pages/main/main.page').then(m => m.MainPage),
    title: 'Main'
  },
  {
    path: '',
    //redirectTo: 'test',
    redirectTo: 'characters',
    pathMatch: 'full'
  },
  {
    path: 'characters',
    loadComponent: () => import('./pages/characters/characters.page').then(m => m.CharactersPage)
  },
  {
    path: 'test',
    loadComponent: () => import('./pages/test/test.page').then(m => m.TestPage)
  },

];
