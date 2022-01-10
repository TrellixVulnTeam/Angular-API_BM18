//App.component.spec.ts

//Import des modules
import { AppRoutingModule } from './app-routing.module';
import { AuthInterceptor } from './_interceptors/auth-interceptor';


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
import { UserComponent } from './user/user.component';
import { ModifyUserComponent } from './user/modify-user/modify-user.component';
import { SingleUserComponent } from './user/single-user/single-user.component';
import { UserStuffListComponent } from './user/user-stuff-list/user-stuff-list.component';

//Import des modules angular et d'outils de test
import { TestBed, async } from '@angular/core/testing';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { AuthService } from './_services/auth.service';

describe('AppComponent', () => { 
    //Déclare de tous les composants utilisés dans le module
    beforeEach(async(() => { 
        TestBed.configureTestingModule({
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
    }).compileComponents();
}));

//Vérification que le composant se compile correctement
it('Module App - 1 - Vérification du lancement du module app', () => { 
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
});

//Vérification que la variable title a la bonne valeur souhaitée
it('Module App - 1 - Vérification de la variable title', () => {  
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;  
    expect(app.title).toEqual('app');
});

});