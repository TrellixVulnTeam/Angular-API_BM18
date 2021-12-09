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

//Import des modules angular
import { TestBed, async } from '@angular/core/testing';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

describe('AppComponent', () => { // 2
    beforeEach(async(() => { // 3
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

it('should create the app', () => { // 4
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
});

it('should have as title \'angular-component-testing\'', () => {  //5
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app.title).toEqual('app');
});

it('should render title in a h1 tag', () => { //6
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('h1').textContent).toContain('Welcome to angular-component-testing!');
});
});