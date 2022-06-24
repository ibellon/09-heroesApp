import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
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
  isCrear: boolean = false;

  constructor(private heroesService: HeroesService,
              private route: ActivatedRoute) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id') || '';

    if(id !== 'nuevo') {
      this.heroesService.getHeroe(id).subscribe(response =>
        { 
          console.log(response);
          this.heroe = response;
          this.heroe.id = id;
        });
    }
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
      this.isCrear = true;
    }

    peticion.subscribe(response => {
      console.info(response);
      Swal.fire({
        title: 'Espere',
        text: this.isCrear ? 'Se creó correctamente': 'Se actualizó correctamente',
        icon: 'success'
      });
    });

  }
}
