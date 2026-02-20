import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'corso/:id',
    loadComponent: () => import('./components/corso-detail/corso-detail.component').then(m => m.CorsoDetailComponent)
  }
];
