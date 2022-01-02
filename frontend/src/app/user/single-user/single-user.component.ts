import { Component, OnDestroy, OnInit } from '@angular/core';
import { StateService } from '../../_services/state.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { User } from '../../_models/user.model';
import { UserService } from '../../_services/user.service';
import { Subscription } from 'rxjs';
import { AuthService } from '../../_services/auth.service';

@Component({
  selector: 'app-single-user',
  templateUrl: './single-user.component.html',
  styleUrls: ['./single-user.component.scss']
})
export class SingleUserComponent implements OnInit, OnDestroy {

  //Déclaration de variables publiques
  public user: User = new User();
  public loading: boolean;
  public userId: string;
  public part: number;

  //Déclaration d'une variable privée
  private partSub: Subscription;

  //Déclaration de composants
  constructor(private state: StateService,
    private router: Router,
    private route: ActivatedRoute,
    private userService: UserService,
    private auth: AuthService) { }

  //Initialisation des variables
  ngOnInit() {
    this.loading = true;
    this.state.mode$.next('single-user');
    this.userId = this.auth.userId ? this.auth.userId : 'userID40282382';

    //obtention des informations d'un utilisateur
    this.userService.getUserById(this.userId).then(
      (user: User) => {
        this.loading = false;
        this.user = user;
       // this.user._id = user._id;
      });
    this.partSub = this.state.part$.subscribe(
      (part) => {
        this.part = part;
        if (part >= 3) {
          this.userId = this.auth.userId;
        }
      }
    );
  }

  //Redirection vers la page Modification d'un produit
  onModify() {
    this.router.navigate(['/user/modify-user/' + this.user._id]);
  }

  //Destruction de la variable partSub
  ngOnDestroy() {
    this.partSub.unsubscribe();
  }
}
