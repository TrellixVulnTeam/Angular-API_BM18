import { Component, OnDestroy, OnInit } from '@angular/core';
import { StateService } from '../../_services/state.service';
import { StuffService } from '../../_services/stuff.service';
import { Subscription } from 'rxjs';
import { Thing } from '../../_models/thing.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-stuff-list',
  templateUrl: './stuff-list.component.html',
  styleUrls: ['./stuff-list.component.scss']
})
export class StuffListComponent implements OnInit, OnDestroy {

  //Déclaration de variables publiques
  public stuff: Thing[] = [];
  public part: number;
  public loading: boolean;

  //Déclaration de variables publiques
  private stuffSub: Subscription;
  private partSub: Subscription;

  //Déclaration de composants
  constructor(private state: StateService,
    private stuffService: StuffService,
    private router: Router) { }

  //Méthide d'initialisation des variables globales 
  ngOnInit() {
    this.loading = true;
    this.state.mode$.next('list');
    this.stuffSub = this.stuffService.stuff$.subscribe(
      (stuff) => {
        this.stuff = stuff;
        this.loading = false;
      }
    );
    this.partSub = this.state.part$.subscribe(
      (part) => {
        this.part = 4;
      }
    );
    this.stuffService.getStuff();
  }

  //Redirection vers la page Fiche produit
  onProductClicked(id: string) {
    if (this.part === 4) {
      this.router.navigate(['/body/thing/' + id]);
    }
  }

  //Méthode de Destruction des variables globales 
  ngOnDestroy() {
    this.stuffSub.unsubscribe();
    this.partSub.unsubscribe();
  }

}
