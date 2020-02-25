import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListComponent } from './list/list.component';
import { DetailsComponent } from './details/details.component';
import { CreateUrlComponent } from './create/create.component';
import { UpdateComponent } from './update/update.component';
import { AuthGuard } from '../services/auth.guard';

const urlRoutes: Routes = [
  { path: '', children:[
    { path: '', redirectTo: 'list', pathMatch: 'full' },
    { path: 'list', component: ListComponent},
    { path: 'details/:ArticuloId', component: DetailsComponent },
    { path: 'create', component: CreateUrlComponent},
    { path: 'update/:urlId', component: UpdateComponent} 
  ]},
  //{ path: 'url/list', component: ListComponent ,canActivate: [AuthGuard] },
  //{ path: 'url/details/:ArticuloId', component: DetailsComponent,canActivate: [AuthGuard] },
  //{ path: 'url/create', component: CreateUrlComponent ,canActivate: [AuthGuard] },
  //{ path: 'url/update/:urlId', component: UpdateComponent , canActivate: [AuthGuard]} 
];

@NgModule({
  imports: [RouterModule.forChild(urlRoutes)],
  exports: [RouterModule],
  providers: [AuthGuard]
})
export class UrlRoutingModule { }
