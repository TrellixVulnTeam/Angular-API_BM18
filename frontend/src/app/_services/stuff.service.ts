import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Thing } from '../_models/thing.model';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class StuffService {

  //Déclaration de composant
  constructor(private http: HttpClient) { }

  //Déclaration/Initialisation des variables publique et privées
  private stuff: Thing;

  public stuff$ = new Subject<Thing>();
  public stuffUser$ = new Subject<Thing>();


  //Méthode d'obtention des informations des produits d'un utilisateur de la base de donné MongoDB
  getStuffUser(id: string) {

    //Envoi des données au serveur backend via l'url http://localhost:3000/api/stuff/user/:id
    this.http.get('http://localhost:3000/api/stuff/user/' + id).subscribe(
      (stuff: Thing) => {
        if (stuff) {

          //Réception des données et stockage
          this.stuff = stuff;
          this.emitStuffUser();
        }
      },
      (error) => {
        console.log(error);
      }
    );
  }



  //Stockage des données reçues dans la variables public stuffUser$
  private emitStuffUser() {
    this.stuffUser$.next(this.stuff);
  }



  //Méthode d'obtention des informations des produits de la base de donné MongoDB
  getStuff() {

    //Envoi de la requète au serveur backend via l'url http://localhost:3000/api/stuff/
    this.http.get('http://localhost:3000/api/stuff').subscribe(

      //Réception des données et stockage
      (stuff: Thing) => {
        if (stuff) {
          this.stuff = stuff;
          this.emitStuff();
        }
      },
      (error) => {
        console.log(error);
      }
    );
  }



  //Stockage des données reçues dans la variables public stuff$
  private emitStuff() {
    this.stuff$.next(this.stuff);
  }



  //Méthode d'obtention des informations d'un produit par sin ID
  getThingById(id: string) {
    return new Promise((resolve, reject) => {

      //Envoi de la requète au serveur backend via l'url http://localhost:3000/api/stuff/:id
      this.http.get('http://localhost:3000/api/stuff/' + id).subscribe(

        //Réception des données et stockage
        (response) => {
          resolve(response);
        },
        (error) => {
          reject(error);
        }
      );
    });
  }



  //Méthode de modification du champs reserv d'un produit 
  modifyReservation(id: string, thing: Thing) {
    return new Promise((resolve, reject) => {

      //Envoi de la requète au serveur backend via l'url http://localhost:3000/api/stuff/reservation/:id (+thing)
      this.http.put('http://localhost:3000/api/stuff/reservation/' + id, thing).subscribe(

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



  //Méthode de création d'un produit dans la base de données MongoDB
  createNewThingWithFile(thing: Thing, image: File) {
    return new Promise((resolve, reject) => {

      //Initalisation/Renseignement des indormations envoyées dans thingData
      const thingData = new FormData();
      thingData.append('thing', JSON.stringify(thing));
      thingData.append('image', image, thing.title);

      //Envoi de la requète au serveur backend via l'url http://localhost:3000/api/stuff/
      this.http.post('http://localhost:3000/api/stuff', thingData).subscribe(

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



  //Méthode de modification des informations d'un produit de la base de données MongoDB
  modifyThingWithFile(id: string, thing: Thing, image: File | string) {
    return new Promise((resolve, reject) => {

      //Initalisation/Renseignement des indormations envoyées dans thingData
      let thingData: Thing | FormData;
      if (typeof image === 'string') {
        thing.imageUrl = image;
        thingData = thing;
      } else {
        thingData = new FormData();
        thingData.append('thing', JSON.stringify(thing));
        thingData.append('image', image, thing.title);
      }

      //Envoi de la requète au serveur backend via l'url http://localhost:3000/api/stuff/:id (+thinfData)
      this.http.put('http://localhost:3000/api/stuff/' + id, thingData).subscribe(

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



  //Méthode de supression d'un produit de la base de données MongoDB
  deleteThing(id: string) {
    return new Promise((resolve, reject) => {

      //Envoi de la requète au serveur backend via l'url http://localhost:3000/api/stuff/:id
      this.http.delete('http://localhost:3000/api/stuff/' + id).subscribe(
        
        //Réception d'un message d'echec ou de réussite   F  
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
