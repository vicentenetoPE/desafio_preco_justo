import { Routes } from '@angular/router';
import { HomePageComponent } from './pages/home/home-page.component';

export const routes: Routes = [
  {
    path: '', component:HomePageComponent
  },
  {
    path: 'post/:id',
    loadComponent: () =>
      import('@pages/post/post.component').then((c) => c.PostComponent),
  },
  { path: '**', redirectTo: '' },
];
