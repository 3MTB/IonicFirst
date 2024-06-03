import { Routes } from '@angular/router';
import { MainPage } from './pages/main/main.page';
import { AppComponent } from './app.component';

export const routes: Routes = [
  {
    path: 'main',
    loadComponent: () => import('./pages/main/main.page').then(m => m.MainPage),
    title: 'Main'
  },
  {
    path: '',
    //redirectTo: 'test',
    redirectTo: 'home',

    // redirectTo: 'characters',
    pathMatch: 'full'
  },
  {
    path: 'characters',
    children: [
      {
        path: '',
        loadComponent: () => import('./pages/characters/characters.page').then(m => m.CharactersPage)
      },
      {
        path: ':id',
        loadComponent: () => import('./pages/detail-character/detail-character.page').then(m => m.DetailCharacterPage)
      }
    ]
  },
  {
    path: 'detail-character',
    loadComponent: () => import('./pages/detail-character/detail-character.page').then(m => m.DetailCharacterPage)
  },
  {
    path: 'home',
    loadComponent: () => import('./pages/main/main.page').then(x => x.MainPage)
  },
  

];
