import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs';
import { StateService } from './state.service';

@Injectable()
export class AuthGuard implements CanActivate {

  //Déclaration des composants
  constructor(private auth: AuthService,
    private state: StateService,
    private router: Router) { }

  //Méthode d'initialisation des variables publiques 
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    return Observable.create(
      (observer) => {
        this.auth.isAuth$.subscribe(
          (auth) => {
            if (!auth) {
              this.state.part$.subscribe(
                (part) => {
                  if (part === 4) {
                    this.router.navigate(['/body/login']);
                  }
                  if (part === 3) {
                    this.router.navigate(['/home']);
                  }
                }
              );
            }
            observer.next(true);
          }
        );
      }
    );
  }
}
