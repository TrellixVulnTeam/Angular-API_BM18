import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { StateService } from '../../_services/state.service';
import { StuffService } from '../../_services/stuff.service';
import { Router } from '@angular/router';
import { AuthService } from '../../_services/auth.service';
import { Thing } from '../../_models/thing.model';
import { mimeType } from '../mime-type.validator';

@Component({
  selector: 'app-new-thing-with-upload',
  templateUrl: './new-thing-with-upload.component.html',
  styleUrls: ['./new-thing-with-upload.component.scss']
})
export class NewThingWithUploadComponent implements OnInit {

  //Déclaration des variables publiques
  public thingForm:  FormGroup = new FormGroup({
    title: new FormControl(),
    description: new FormControl(),
    price: new FormControl(),
    image: new FormControl()
});
  public loading = false;
  public part: number;
  public userId: string;
  public imagePreview: string;
  public errorMessage: string;

  //Déclaration des composants
  constructor(private state: StateService,
    private formBuilder: FormBuilder,
    private stuffService: StuffService,
    private router: Router,
    private auth: AuthService) { }

  //Initialisation des variables
  ngOnInit() {
    this.state.mode$.next('form');
    this.thingForm = this.formBuilder.group({
      title: [null, Validators.required],
      description: [null, Validators.required],
      price: [0, Validators.required],
      image: [null, Validators.required, mimeType]
    });
    this.userId = this.auth.userId;
  }

  //Méthode de validation de la vente d'un nouveau produit
  onSubmit() {
    this.loading = true;
    const thing = new Thing();

    //Récupération des valeurs via le formulaire de la page HTML 
    thing.title = this.thingForm.get('title').value;
    thing.description = this.thingForm.get('description').value;
    thing.price = this.thingForm.get('price').value * 100;
    thing.imageUrl = '';
    thing.userId = this.userId;
    this.stuffService.createNewThingWithFile(thing, this.thingForm.get('image').value).then(
      
      //Redirection si réussite
      () => {
        this.thingForm.reset();
        this.loading = false;
        this.router.navigate(['/user/all-stuff']);
      },
      (error) => {
        this.loading = false;
        this.errorMessage = error.message;
      }
    );
  }

  //Méthode d'ajout d'une image à un produit lors de sa création 
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
