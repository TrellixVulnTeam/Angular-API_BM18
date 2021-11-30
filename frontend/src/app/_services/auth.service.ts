import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  //Déclaration des variables publiques et privées
  isAuth$ = new BehaviorSubject<boolean>(false);
  token: string;
  userId: string;
  lastname: string;
  firstname: string;

  //Déclaration de composants
  constructor(private router: Router,
    private http: HttpClient) { }

  //Méthode de création d'un nouvel utilisateur
  createNewUser(firstname: string, lastname: string, email: string, password: string) {
    return new Promise<void>((resolve, reject) => {

      //Envoi des données au serveur backend via l'url http://localhost:3000/api/auth/signup 
      this.http.post(
        'http://localhost:3000/api/auth/signup',
        { firstname: firstname, lastname: lastname, email: email, password: password })
        .subscribe(
          () => {

            //Identification de l'utilisateur inscrit
            this.login(email, password).then(
              () => {
                resolve();
              }
            ).catch(
              (error) => {
                reject(error);
              }
            );
          },
          (error) => {
            reject(error);
          }
        );
    });
  }



  //Méthode d'authentification d'un nouvel utilisateur
  login(email: string, password: string) {
    return new Promise<void>((resolve, reject) => {

      //Envoi des données au serveur backend via l'url http://localhost:3000/api/auth/login 
      this.http.post(
        'http://localhost:3000/api/auth/login',
        { email: email, password: password })

        //Réception des données
        .subscribe(
          (authData: { token: string, userId: string }) => {
            this.token = authData.token;
            this.userId = authData.userId;
            this.isAuth$.next(true);
            resolve();
          },
          (error) => {
            reject(error);
          }
        );
    });
  }


  
  //Remise  à zéro des variables
  logout() {
    this.isAuth$.next(false);
    this.userId = null;
    this.token = null;
  }
}
