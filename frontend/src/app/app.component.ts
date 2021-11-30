import { Component } from '@angular/core';
import { AuthService } from './_services/auth.service';
import { StateService } from './_services/state.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'app';

  //Déclaration des composants
  constructor(private state: StateService,
    private auth: AuthService) { }

  //Initialisation des variables publiques de connexion et d'authentification
  ngOnInit() {
    this.auth.isAuth$.next(false);
    this.auth.userId = '';
    this.auth.token = '';
    this.state.part$.next(3);
    this.state.part = 3;
  }
}
