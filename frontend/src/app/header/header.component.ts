import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { StateService } from '../_services/state.service';
import { AuthService } from '../_services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {

  //Déclaration des variables publiques
  public mode: string;
  public part: number;
  public isAuth: boolean;

  //Déclaration des variables privées
  private modeSub: Subscription;
  private partSub: Subscription;
  private isAuthSub: Subscription;

  //Déclaration des composants
  constructor(private state: StateService,
    private auth: AuthService,
    private router: Router) { }

  //Initialisation des variables publiques
  ngOnInit() {
    this.modeSub = this.state.mode$.subscribe(
      (mode) => {
        this.mode = mode;
      }
    );
    this.partSub = this.state.part$.subscribe(
      (part) => {
        this.part = 4;
      }
    );
    this.isAuthSub = this.auth.isAuth$.subscribe(
      (auth) => {
        this.isAuth = auth;
      }
    );
  }

  //Déconnexion de la personne authentifiée et redirection vers /body/login  
  onLogout() {
    this.auth.logout();

    //Redicrection à la page de connexion
    this.router.navigate(['/body/login']);
  }

  //Retour à l'accueil
  onBackToParts() {
    this.part = 3;

    //Redirection à la Acceuil
    this.router.navigate(['/home']);
  }

  //Destruction des valeurs des variables privées
  ngOnDestroy() {
    this.modeSub.unsubscribe();
    this.partSub.unsubscribe();
    this.isAuthSub.unsubscribe();
  }

}
