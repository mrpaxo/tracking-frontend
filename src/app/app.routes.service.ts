
/*
import { Map1Component } from './views/maps/map1/map1.component';
import { BasicTableComponent } from './views/tables/basic-table/basic-table.component';
import { Profile1Component } from './views/profile/profile1/profile1.component';
import { Dashboard1Component } from './views/dashboards/dashboard1/dashboard1.component';
*/
import { ModalsComponent } from './views/modals/modals.component';
import { RouterModule, Route } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';
import { NotFoundComponent } from './views/errors/not-found/not-found.component';

import { AuthGuard } from './services/auth.guard';
import { LoginComponent } from './login/login.component';



const routes: Route[] = [
  
  { path: '', pathMatch: 'full', canActivate: [AuthGuard],redirectTo: 'url/list' },
  {
    path: 'url',
    canActivate: [AuthGuard],
    loadChildren: "./url/url.module#UrlModule",
  },
  /*{ path: 'dashboards', children:
    [
      { path: 'v1', component: Dashboard1Component },
    ]
  },
  { path: 'profiles', children:
    [
      { path: 'profile1', component: Profile1Component },
    ]
  },
  { path: 'tables', children:
    [
      { path: 'table1', component: BasicTableComponent },
    ]
  },
  { path: 'maps', children:
    [
      { path: 'map1', component: Map1Component},
    ]
  },*/

  { path: 'modals', component: ModalsComponent,canActivate: [AuthGuard]},
  { path: 'login', component: LoginComponent},
  { path: '**', component: NotFoundComponent },

];

export const AppRoutes: ModuleWithProviders = RouterModule.forRoot(routes);
