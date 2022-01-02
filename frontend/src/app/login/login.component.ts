import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../_services/auth.service';
import { StateService } from '../_services/state.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  //Déclaration des variables
  loginForm: FormGroup = new FormGroup({
    email: new FormControl(),
    password: new FormControl()
  });
  loading = false;
  errorMessage: string = '';

  //Déclaration des composants
  constructor(private formBuilder: FormBuilder,
              private router: Router,
              private auth: AuthService,
              private state: StateService) { }

  //Initialisation des variables
  ngOnInit() {
    this.state.mode$.next('form');
    this.loginForm = this.formBuilder.group({
      email: [null, [Validators.required, Validators.email]],
      password: [null, Validators.required]
    });
  }

  //Méthode de connexion
  onLogin() {
    this.loading = true;

    //Récupération des données de la page HTML
    const email = this.loginForm.get('email').value;
    const password = this.loginForm.get('password').value;
    
    //Envoie des données vers la méthode login
    this.auth.login(email, password).then(
      //Résultat positif
      () => {
        this.loading = false;
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