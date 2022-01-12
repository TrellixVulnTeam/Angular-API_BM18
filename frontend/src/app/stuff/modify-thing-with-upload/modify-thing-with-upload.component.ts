import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { StateService } from '../../_services/state.service';
import { StuffService } from '../../_services/stuff.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../_services/auth.service';
import { mimeType } from '../mime-type.validator';
import { Thing } from '../../_models/thing.model';

@Component({
  selector: 'app-modify-thing-with-upload',
  templateUrl: './modify-thing-with-upload.component.html',
  styleUrls: ['./modify-thing-with-upload.component.scss']
})
export class ModifyThingWithUploadComponent implements OnInit {

  //Déclaration des variables publiques
  public thingForm: FormGroup = new FormGroup({
        title: new FormControl(),
        description: new FormControl(),
        price: new FormControl(),
        image: new FormControl()
  });
  public thing: Thing = new Thing;
  public loading = false;
  public part: number;
  public userId: string;
  public imagePreview: string;
  public errorMessage: string;

  //Déclaration des composants
  constructor(private state: StateService,
    private formBuilder: FormBuilder,
    private stuffService: StuffService,
    private route: ActivatedRoute,
    private router: Router,
    private auth: AuthService) { }

  //Initialisation des variables
  ngOnInit() {
    this.loading = true;
    this.state.mode$.next('form');
    this.userId = this.auth.userId;
    this.route.params.subscribe(
      (params) => {

        //Récupération des informations d'un produit par son ID 
        this.stuffService.getThingById(params.id).then(
          (thing: Thing) => {
            this.thing = thing;

            //Application de contrainte de format
            this.thingForm = this.formBuilder.group({
              title: [thing.title, Validators.required],
              description: [thing.description, Validators.required],
              price: [thing.price / 100, Validators.required],
              image: [thing.imageUrl, Validators.required, mimeType]
            });
            this.imagePreview = thing.imageUrl;
            this.loading = false;
          }
        );
      }
    );
  }

  //Méthode de validation de la modification d'un objet
  onSubmit() {
    this.loading = true;
    const thing = new Thing();

    //Récupération des données de la page HTML
    thing._id = this.thing._id;
    thing.title = this.thingForm.get('title').value;
    thing.description = this.thingForm.get('description').value;
    thing.price = this.thingForm.get('price').value * 100;
    thing.imageUrl = '';
    thing.userId = this.userId;

    //Envoie des données à la méthode modifyThingWithFile
    this.stuffService.modifyThingWithFile(this.thing._id, thing, this.thingForm.get('image').value).then(
      //Rédirection si réussite
      () => {
        this.thingForm.reset();
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

  //Méthode de modification d'une image 
  private onImagePick(event: Event) {
    const file = (event.target as HTMLInputElement).files[0];
    this.thingForm.get('image').patchValue(file);
    this.thingForm.get('image').updateValueAndValidity();
    const reader = new FileReader();
    reader.onload = () => {
      if (this.thingForm.get('image').valid) {
        this.imagePreview = reader.result as string;
      } else {
        this.imagePreview = null;
      }
    };
    reader.readAsDataURL(file);
  }

}