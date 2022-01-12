import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { StateService } from '../../_services/state.service';
import { UserService } from '../../_services/user.service';
import { User } from '../../_models/user.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-modify-user',
  templateUrl: './modify-user.component.html',
  styleUrls: ['./modify-user.component.scss']
})
export class ModifyUserComponent implements OnInit {

  //Déclaration de variables
  private user: User = new User;
  private userForm: FormGroup = new FormGroup({
    firstname: new FormControl(),
    lastname: new FormControl(),
    email: new FormControl(),
    password: new FormControl()
  });
  loading = false;
  private errorMessage: string = null;
  private part: number = null;

  //Déclaration d'une variable privée 
  private partSub: Subscription;

  //Déclaration de composants
  constructor(private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private state: StateService,
    private userService: UserService) { }

  //Déclaration/Initialisation des variables
  ngOnInit() {
    this.loading = true;

    //Initialisation userForm avec des contraintes sur les champs saisies
    this.userForm = this.formBuilder.group({
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
    this.partSub = this.state.part$.subscribe(
      (part) => {
        this.part = part;
      }
    );

    this.state.mode$.next('form');
    this.route.params.subscribe(
      (params) => {

        //Obtention des informations d'un utilisateur
        this.userService.getUserById(params.id).then(
          (user: User) => {
            console.log(user);
            this.user = user;
            this.userForm.get('firstname').setValue(this.user.firstname);
            this.userForm.get('lastname').setValue(this.user.lastname);
            this.userForm.get('email').setValue(this.user.email);
            this.userForm.get('password').setValue(this.user.password);
            this.loading = false;
          }
        );
      }
    );
  }

  //Méthode de modification d'un utlisateur
  onSubmit() {
    this.loading = true;
    
    //Obtention des informations d'un utilisateur
    const user = new User();
    user.firstname = this.userForm.get('firstname').value;
    user.lastname = this.userForm.get('lastname').value;
    user.email = this.userForm.get('email').value;
    user.password = this.userForm.get('password').value;
    user._id = new Date().getTime().toString();
    user.userId = this.user.userId;
    
    //Modification d'un utilisateur en fonction de son ID et envoie des données associées 
    this.userService.modifyUser(this.user._id, user).then(
      () => {
        this.userForm.reset();
        this.loading = false;
        this.router.navigate(['/user/account']);
      },
      (error) => {
        this.loading = false;
        this.errorMessage = error.message;
      }
    );
  }

}
