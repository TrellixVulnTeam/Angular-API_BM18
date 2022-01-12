import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';

import { User } from '../_models/user.model';

@Injectable({ providedIn: 'root' })
export class UserService {

    //Déclaration/Initialisation des variables
    public user$ = new Subject<User[]>();
    private user: User[];

    //Déclaration de composant
    constructor(private http: HttpClient) { }



    //Méthode d'obtention des informations des utilisateurs à la base de donné MongoDB
    private getAllUser() {

        //Envoi de la requète au serveur backend via l'url http://localhost:3000/api/auth/get/all
        return this.http.get<User[]>(`http://localhost:3000/api/auth/get/all`).subscribe(
            (user: User[]) => {

                //Réception des données et stockage
                if (user) {
                    this.user = user;
                    this.emitUser();
                }
            },
            (error) => {
                console.log(error);
            }
        );
    }



    //Stockage des données reçues dans la variables public user$
    private emitUser() {
        this.user$.next(this.user);
    }



    //Méthode d'obtention des informations d'un utilisateur de la base de donné MongoDB
    getUserById(id: string) {
        return new Promise((resolve, reject) => {

            //Envoi de la requète au serveur backend via l'url http://localhost:3000/api/auth/get/:id
            return this.http.get<User[]>('http://localhost:3000/api/auth/get/' + id).subscribe(

                //Réception d'un message d'echec ou de réussite   
                (response) => {
                    resolve(response);
                },
                (error) => {
                    reject(error);
                }
            );
        });
    }



    //Méthode de modification des informations d'un utilisateur de la base de donné MongoDB
    modifyUser(id: string, user: User) {
        return new Promise((resolve, reject) => {

            //Envoi de la requète au serveur backend via l'url http://localhost:3000/api/auth/maudify:id (+user)
            return this.http.put('http://localhost:3000/api/auth/modify/' + id, user).subscribe(

                //Réception d'un message d'echec ou de réussite   
                (response) => {
                    resolve(response);
                },
                (error) => {
                    reject(error);
                }
            );
        });
    }



    //Methode de suppression d'un utilisateur selon son identifiant 
    private deleteUser(id: string) {
        return new Promise((resolve, reject) => {

            //Envoi de la requète au serveur backend via l'url http://localhost:3000/api/auth/delete/:id
            this.http.delete('http://localhost:3000/api/auth/delete/' + id).subscribe(
                
                //Réception d'un message d'echec ou de réussite       
                (response) => {
                    resolve(response);
                },
                (error) => {
                    reject(error);
                }
            );
        });
    }
}