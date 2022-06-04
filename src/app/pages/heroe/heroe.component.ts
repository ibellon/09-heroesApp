import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Observable } from 'rxjs';
import { HeroeModel } from 'src/app/models/heroe.model';
import { HeroesService } from 'src/app/services/heroes-service';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-heroe',
  templateUrl: './heroe.component.html',
  styleUrls: ['./heroe.component.css']
})
export class HeroeComponent implements OnInit {

  heroe: HeroeModel = new HeroeModel();

  constructor(private heroesService: HeroesService) { }

  ngOnInit(): void {
  }

  guardar(form: NgForm) {

    if(form.invalid) {
      console.log("Formulario no válido");
    }
    
    Swal.fire({
      title: 'Espere',
      text: 'Guardando información',
      icon: 'info',
      allowOutsideClick: false
    });

    Swal.showLoading();

    let peticion: Observable<any>;
    
    console.log("HEROE ", this.heroe.id);

    if(this.heroe.id) {
      peticion = this.heroesService.actualizarHeroe(this.heroe);
    }
    else {
      peticion = this.heroesService.crearHeroe(this.heroe);
    }

    peticion.subscribe(response => {
      console.info(response);
      Swal.fire({
        title: 'Espere',
        text: 'Se actualizó correctamente',
        icon: 'success'
      });
    });

  }
}
