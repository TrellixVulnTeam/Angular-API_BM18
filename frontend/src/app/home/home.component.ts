import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../_services/auth.service';
import { StateService } from '../_services/state.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  //Déclaration/Initialisation des variables en Input()
  @Input() icone: string = "/assets/_image/icone/5.png";
  @Input() title: string = 'PolyCommerce';

  //Déclaration des composants utilisés
  constructor(private router: Router,
    private state: StateService,
    private auth: AuthService) { }

  //Initialisation des variables d'authentification 
  ngOnInit() {
    this.auth.isAuth$.next(false);
    this.auth.userId = '';
    this.auth.token = '';
    this.state.part$.next(3);
    this.state.part = 3;
  }

  private onNavigate(endpoint: string) {
    this.router.navigate([endpoint]);
  }
}
