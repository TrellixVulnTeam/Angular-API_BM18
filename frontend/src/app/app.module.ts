//Import des services d'angular
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

//Import des composants
import { AppComponent } from './app.component';
import { StuffComponent } from './stuff/stuff.component';
import { HomeComponent } from './home/home.component';
import { HeaderComponent } from './header/header.component';
import { StuffListComponent } from './stuff/stuff-list/stuff-list.component';
import { SingleThingComponent } from './stuff/single-thing/single-thing.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { NewThingWithUploadComponent } from './stuff/new-thing-with-upload/new-thing-with-upload.component';
import { ModifyThingWithUploadComponent } from './stuff/modify-thing-with-upload/modify-thing-with-upload.component';

//Import des modules
import { AuthInterceptor } from './_interceptors/auth-interceptor';
import { UserComponent } from './user/user.component';
import { ModifyUserComponent } from './user/modify-user/modify-user.component';
import { SingleUserComponent } from './user/single-user/single-user.component';
import { UserStuffListComponent } from './user/user-stuff-list/user-stuff-list.component';

//Déclaration/Import des composants et modules utilisés
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HeaderComponent,
    StuffListComponent,
    SingleThingComponent,
    StuffComponent,
    LoginComponent,
    RegisterComponent,
    NewThingWithUploadComponent,
    ModifyThingWithUploadComponent,
    UserComponent,
    ModifyUserComponent,
    SingleUserComponent,
    UserStuffListComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatProgressSpinnerModule,
    HttpClientModule
  ],
  providers: [{ provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }],
  bootstrap: [AppComponent]
})
export class AppModule { }
