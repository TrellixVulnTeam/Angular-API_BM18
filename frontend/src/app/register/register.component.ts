import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../_services/auth.service';
import { StateService } from '../_services/state.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  //Déclaratino des variables
  signupForm: FormGroup = new FormGroup({
    firstname: new FormControl(),
    lastname: new FormControl(),
    email: new FormControl(),
    password: new FormControl()
  });
  loading = false;
  errorMessage: string;
  part: number;

  //Déclaratino des composants
  constructor(private formBuilder: FormBuilder,
    private router: Router,
    private auth: AuthService,
    private state: StateService) { }

  //Déclaration/Initialisation des variables
  ngOnInit() {
    this.state.mode$.next('form');
    this.signupForm = this.formBuilder.group({
      firstname: [null, [Validators.required]],
      lastname: [null, [Validators.required]],
      email: [null, [Validators.required, Validators.email]],
      password: [null, Validators.required]
    });
  }

  //Mathode d'inscription
  onSignup() {
    this.loading = true;
    this.part = 3;

    //Initialisation des variables via la page HTML
    const firstname = this.signupForm.get('firstname').value;
    const lastname = this.signupForm.get('lastname').value;
    const email = this.signupForm.get('email').value;
    const password = this.signupForm.get('password').value;

    //Envoi des données à la méthode createNewUser
    this.auth.createNewUser(firstname, lastname, email, password).then(
      //Rédirection si réussite
      () => {
        this.loading = false;
        //Rédirection vers la page Produit
        this.router.navigate(['/body/all-stuff']);

      }
    ).catch(
      (error) => {
        this.loading = false;
        this.errorMessage = error.message;
      }
    );
  }
}
