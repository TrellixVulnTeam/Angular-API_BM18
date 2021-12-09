import { Location } from "@angular/common";
import { TestBed, fakeAsync, tick } from '@angular/core/testing';
import { RouterTestingModule } from "@angular/router/testing";
import { Router } from "@angular/router";

import { UserComponent } from '../user/user.component';
import { ModifyUserComponent } from '../user/modify-user/modify-user.component';
import { SingleUserComponent } from '../user/single-user/single-user.component';
import { UserStuffListComponent } from '../user/user-stuff-list/user-stuff-list.component';
import { routes } from "../app-routing.module";
import { AppComponent } from "../app.component";

describe('Router: App', () => {

    let location: Location;
    let router: Router;
    let fixture;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [RouterTestingModule.withRoutes(routes)],
            declarations: [
                UserComponent,
                ModifyUserComponent,
                SingleUserComponent,
                UserStuffListComponent
            ]
        });

        router = TestBed.get(Router);
        location = TestBed.get(Location);

        fixture = TestBed.createComponent(AppComponent);
        router.initialNavigation();
    });

    it("fakeAsync works", fakeAsync(() => {
        let promise = new Promise(resolve => {
            setTimeout(resolve, 10);
        });
        let done = false;
        promise.then(() => (done = true));
        tick(50);
        expect(done).toBeTruthy();
    }));
/*
    it('navigate to "Account" redirects you to /user/account', fakeAsync(() => {
        router.navigate(["/user/account"]).then(() => {
            expect(location.path()).toBe("/user/account");
        });
    }));

    it('navigate to "" redirects you to /', fakeAsync(() => {
        router.navigate([""]).then(() => {
            expect(location.path()).toBe("/");
        });
    }));
    it('navigate to "" redirects you to /', fakeAsync(() => {
        router.navigate([""]).then(() => {
            expect(location.path()).toBe("/");
        });
    }));

    it('navigate to "" redirects you to /', fakeAsync(() => {
        router.navigate([""]).then(() => {
            expect(location.path()).toBe("/");
        });
    }));

    it('navigate to "search" takes you to /search', fakeAsync(() => {
        router.navigate(["/search"]).then(() => {
            expect(location.path()).toBe("/search");
        });
    }));*/
});

/*
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
{ path: '**', redirectTo: '' }*/