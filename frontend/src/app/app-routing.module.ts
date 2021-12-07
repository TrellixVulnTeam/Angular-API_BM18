import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

//Imports des composants
import { StuffComponent } from './stuff/stuff.component';
import { HomeComponent } from './home/home.component';
import { StuffListComponent } from './stuff/stuff-list/stuff-list.component';
import { SingleThingComponent } from './stuff/single-thing/single-thing.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { AuthGuard } from './_services/auth-guard.service';
import { NewThingWithUploadComponent } from './stuff/new-thing-with-upload/new-thing-with-upload.component';
import { ModifyThingWithUploadComponent } from './stuff/modify-thing-with-upload/modify-thing-with-upload.component';
import { UserComponent } from './user/user.component';
import { ModifyUserComponent } from './user/modify-user/modify-user.component';
import { SingleUserComponent } from './user/single-user/single-user.component';
import { UserStuffListComponent } from './user/user-stuff-list/user-stuff-list.component';

export const routes: Routes = [

  //Redirection concernant les produits 
  {
    path: 'body', component: StuffComponent,
    children: [
      { path: 'new-thing', component: NewThingWithUploadComponent, canActivate: [AuthGuard] },
      { path: 'all-stuff', component: StuffListComponent, canActivate: [AuthGuard] },
      { path: 'thing/:id', component: SingleThingComponent, canActivate: [AuthGuard] },
      { path: 'modify-thing/:id', component: ModifyThingWithUploadComponent, canActivate: [AuthGuard] },
      { path: 'login', component: LoginComponent },
      { path: 'register', component: RegisterComponent },
      { path: '', pathMatch: 'full', redirectTo: 'login' },
      { path: '**', redirectTo: 'all-stuff' }
    ]
  },

  //Redirection concernant les utilisateurs 
  {
    path: 'user', component: UserComponent,
    children: [
      { path: 'account', component: SingleUserComponent, canActivate: [AuthGuard] },
      { path: 'modify-user/:id', component: ModifyUserComponent, canActivate: [AuthGuard] },
      { path: 'all-stuff', component: UserStuffListComponent, canActivate: [AuthGuard] },
      { path: '', pathMatch: 'full', redirectTo: 'login' },
      { path: '**', redirectTo: 'account' }
    ]
  },

  //Redirection concernant l'accueil
  { path: 'home', component: HomeComponent },
  { path: '', pathMatch: 'full', component: HomeComponent },
  { path: '**', redirectTo: '' }
];

//Partie redirection du site
@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ],
  providers: [
    AuthGuard
  ]
})
export class AppRoutingModule { }
