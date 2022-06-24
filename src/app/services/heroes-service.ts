import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HeroeModel } from '../models/heroe.model';

import { map, delay } from 'rxjs/operators';
import { ObjectUnsubscribedError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HeroesService {

  private url = "https://login-app-8071b-default-rtdb.europe-west1.firebasedatabase.app";

  constructor(private http: HttpClient) {

  }

  crearHeroe(heroe: HeroeModel){
    return this.http.post(this.url+"/heroes.json", heroe)
    .pipe(
      map((resp: any)=> {
        heroe.id = resp.name;
        return heroe;
      })
    );
  }

  actualizarHeroe(heroe: HeroeModel) {
    const heroeTemp = {
      ...heroe
    };

    delete heroeTemp.id;

    return this.http.put(this.url+"/heroes/"+heroe.id+".json", heroeTemp);
  }

  getHeroes() {
    return this.http.get(this.url+"/heroes.json")
      .pipe(
        map(response => this.crearObjeto(response)), delay(1500)
      );
  }

  getHeroe(id: string) {
    return this.http.get<HeroeModel>(this.url+"/heroes/"+id+".json");
  }

  borrarHeroe(id: string) {
    return this.http.delete<HeroeModel>(this.url+"/heroes/"+id+".json");
  }

  private crearObjeto(heroesObject: any) {

    const heroes: HeroeModel[] = [];

    Object.keys(heroesObject).forEach(key => {
      const heroe: HeroeModel = heroesObject[key];
      heroe.id = key;
      heroes.push(heroe);
    });

    return heroes;
  }
}
