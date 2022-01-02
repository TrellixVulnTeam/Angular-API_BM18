import { Component, OnDestroy, OnInit } from '@angular/core';
import { StateService } from '../../_services/state.service';
import { StuffService } from '../../_services/stuff.service';
import { Subscription } from 'rxjs';
import { Thing } from '../../_models/thing.model';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/_services/auth.service';

@Component({
  selector: 'app-user-stuff-list',
  templateUrl: './user-stuff-list.component.html',
  styleUrls: ['./user-stuff-list.component.scss']
})
export class UserStuffListComponent implements OnInit {

  //Déclaration/Initialisation des variables privées
  public things: Thing = new Thing();
  public part: number = 0;
  public loading: boolean = true;
  public userId: string = "";

  //Déclaration des variables privées
  private stuffSub: Subscription;
  private partSub: Subscription;

  //Déclaration des composants
  constructor(private state: StateService,
    private stuffService: StuffService,
    private router: Router,
    private auth: AuthService) { }

  //Initialisation des variables mode$, loading et userID
  ngOnInit() {
    this.loading = true;
    this.state.mode$.next('stuff-user');
    this.userId = this.auth.userId ? this.auth.userId : 'userID40282382';

    this.stuffSub = this.stuffService.stuffUser$.subscribe(
      (stuffUser) => {
        this.loading = false;
        this.things = stuffUser;
      }
    );
    this.partSub = this.state.part$.subscribe(
      (part) => {
        this.part = 4;
      }
    );
    this.stuffService.getStuffUser(this.userId);
  }

  //Envoie vers la page Fiche produit
  onProductClicked(id: string) {
    this.router.navigate(['/body/thing/' + id]);
  }

  //Destruction des variables stuffSub et partSub
  ngOnDestroy() {
    this.stuffSub.unsubscribe();
    this.partSub.unsubscribe();
  }

}
