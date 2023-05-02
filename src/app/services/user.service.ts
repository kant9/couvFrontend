import { Injectable } from '@angular/core';
import { BehaviorSubject, map } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from '../models/user';
import { HttpClient } from '@angular/common/http'
import { Serre } from '../models/serre';
import { Arrosage } from '../models/arrosage';
import { Cycle } from '../models/cycle';



@Injectable({
  providedIn: 'root'
})
export class UserService {

  //Creation de l'objet behavior subject qui require une valeeur initiale ici de type utilisateur
  //Permet d'emettre la valeur actuel lorsqu'on s'abonne à l'observable BehaviorSubject
  private currentUserSubject: BehaviorSubject<User>;

  //Injection de dependance du module httpClient
  //Qui permet de faire les requetes

  constructor(private httpClient:HttpClient) {
    //Recuperation du token au niveau du localstorage dès la creation de ce service 
    //Stockage du token dans l'observable currentUserSubject

    this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')!!));
  }

  //Creation de la methode get pour recuperer la valeur du token actuelle
  public get currentUserValue(): User {
    return this.currentUserSubject.value;
  }

  //Connexion de l'utilisateur 

  getConnexion(user:User){
    return this.httpClient.post<User>(`${environment.apiUrl}/api/login`,user).
      pipe(map(user => {
        // store user details and jwt token in local storage to keep user logged in between page refreshes
        //Ceci permet de garder l'utilisateur connecté entre les differentes pages
        localStorage.setItem('currentUser', JSON.stringify(user.data?.token));
        localStorage.setItem('id', JSON.stringify(user.data?.userId));

        this.currentUserSubject.next(user);
        return user;
      }));

  }

  update(id:any,user:User){
    return this.httpClient.patch<User>(`${environment.apiUrl}/api/update/${id}`,user)
  }

  getSerre(){
    return this.httpClient.get<Serre>(`${environment.apiUrl}/serre/`)
  }

  updatecycle(id:any,cycle:Cycle){
    return this.httpClient.patch<Arrosage>(`${environment.apiUrl}/updateArrosage/${id}`,cycle)
  }

  sauvegrder(cycle:Cycle){
    return this.httpClient.patch<Cycle>(`${environment.apiUrl}/envDcycle`,cycle)
    
  }

  getArrosage(){
    return this.httpClient.get<Arrosage>(`${environment.apiUrl}/arrosage`)
  }


  // service pour modifier les donnees du cycle
  updateArrosage(id:any,cycle:Cycle){
    return this.httpClient.patch<Cycle>(`${environment.apiUrl}/updateArrosage/${id}`,cycle)
  }
  
}
