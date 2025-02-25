import { Routes } from '@angular/router';
import {DashboardComponent} from './pages/dashboard/dashboard.component';
import {ListComponent} from './pages/mangas/list/list.component';
import {MangasComponent} from './pages/mangas/mangas.component';
import {ReadComponent} from './pages/mangas/read/read.component';
import { AccountComponent } from './pages/account/account.component';
import { ProfileComponent } from './pages/account/profile/profile.component';
import { SettingsComponent } from './pages/account/settings/settings.component';

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
      },
      {
        path: ':id/:bookid/read',
        component: ReadComponent,
        title: "mangaka :: Lecture..."
      }
    ]
  }
  ,
  {
    path: 'account',
    component: AccountComponent,
    children: [
      {
        path: '',
        redirectTo: '/account/profile',
        pathMatch: 'full'
      },
      {
        path: 'profile',
        component: ProfileComponent,
        title: "mangaka :: Mon compte"
      },
      {
        path: 'settings',
        component: SettingsComponent,
        title: "mangaka :: Paramètres"
      }
    ]
  }
];
