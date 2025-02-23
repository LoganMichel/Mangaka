import { Routes } from '@angular/router';
import {DashboardComponent} from './pages/dashboard/dashboard.component';
import {ListComponent} from './pages/mangas/list/list.component';
import {MangasComponent} from './pages/mangas/mangas.component';

export const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    title: "mangaka :: Ma collection de manga"
  },
  {
    path: 'manga',
    component: MangasComponent,
    children: [
      {
        path: '',
        redirectTo: '/',
        pathMatch: 'full'
      },
      {
        path: ':id/list',
        component: ListComponent,
        title: "mangaka :: Liste des scans"
      }
    ]
  }
];
