import { Component, OnDestroy, OnInit } from '@angular/core';
import { StateService } from '../../_services/state.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Thing } from '../../_models/thing.model';
import { StuffService } from '../../_services/stuff.service';
import { Subscription } from 'rxjs';
import { AuthService } from '../../_services/auth.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-single-thing',
  templateUrl: './single-thing.component.html',
  styleUrls: ['./single-thing.component.scss']
})
export class SingleThingComponent implements OnInit, OnDestroy {
  
  //Déclaration des variables publiques
  public reservForm:  FormGroup = new FormGroup({
    proposition: new FormControl(),
});
  public thing: Thing = new Thing;
  public loading: boolean;
  public userId: string;
  public part: number;
  public errorMessage: string;

  //Déclaration des variables privées
  private partSub: Subscription;

  //Déclaration des composants 
  constructor(private state: StateService,
    private router: Router,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private stuffService: StuffService,
    private auth: AuthService) { }

  //Initialisation des variables
  ngOnInit() {
    this.loading = true;
    this.state.mode$.next('single-thing');
    this.userId = this.auth.userId ? this.auth.userId : 'userID40282382';
    this.route.params.subscribe(

      //Récupération des données via l'ID d'un produit et la méthode getThingById 
      (params: Params) => {
        this.stuffService.getThingById(params.id).then(
          (thing: Thing) => {
            this.loading = false;
            this.thing = thing;

            this.reservForm = this.formBuilder.group({
              proposition: [thing.reserv, Validators.required],
            }
            );
          }
        );
        this.partSub = this.state.part$.subscribe(
          (part) => {
            this.part = part;
            this.userId = this.auth.userId;
          }

        );
      }
    );
  }


  //Méthode de proposition d'un prix d'achat
  onReserv() {
    this.loading = true;
    const thing = new Thing();
    thing._id = this.thing._id;

    //Obtention du prix proposé 
    thing.reserv = this.reservForm.get('proposition').value;
    //Modification de la BBD
    this.stuffService.modifyReservation(this.thing._id, thing).then(
      () => {
        this.reservForm.reset();
        this.loading = false;
        //Redirection vers la page Produit 
        this.router.navigate(['/body/all-stuff']);
      },
      (error) => {
        this.loading = false;
        this.errorMessage = error.message;
      }
    );
  }

  //Redirection vers la page Produit 
  onGoBack() {
    this.router.navigate(['/body/all-stuff']);
  }

  //Redirection vers la page Modification produit 
  onModify() {
    this.router.navigate(['/body/modify-thing/' + this.thing._id]);
  }


  //Méthode de supression d'un produit
  onDelete() {
    this.loading = true;
    this.stuffService.deleteThing(this.thing._id).then(
      () => {
        this.loading = false;
        //Redirection vers la page Produit 
        this.router.navigate(['/body/all-stuff']);
      }
    );
  }

  //Fenètre popup pour la suppresion d'un produit
  clickMethod() {
    if (confirm("Etes vous sur de vouloir supprimer cet article ?")) {
      this.onDelete();
    }
  }

  //Suprpesion variables partSub
  ngOnDestroy() {
    this.partSub.unsubscribe();
  }
}
