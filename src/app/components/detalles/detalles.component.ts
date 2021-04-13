import { Component, Input, OnInit } from '@angular/core';
import { MoviesService } from '../../services/movies.service';
import { PeliculaDetalle, Cast } from '../../interfaces/interfaces';
import { ModalController } from '@ionic/angular';
import { DataLocalService } from 'src/app/services/data-local.service';

@Component({
  selector: 'app-detalles',
  templateUrl: './detalles.component.html',
  styleUrls: ['./detalles.component.scss'],
})
export class DetallesComponent implements OnInit {

  @Input() id;
  pelicula: PeliculaDetalle = {};
  oculto = 120;
  actores: Cast[] = [];
  estadofavorito: string = 'star-outline';

  slideOptActorees = {
    slidesPerView : 3.3,
    freeMode: true,
    spaceBetween: -5
  }

  constructor( private moviesService: MoviesService,
               private modalController: ModalController,
               private dataservice: DataLocalService ) { }

  ngOnInit() {
    this.dataservice.existePelicula(this.id).then(
      existe => this.estadofavorito = (existe) ? 'star' : 'star-outline'
    );
    
    this.moviesService.getPeliculaDetalles(this.id)
        .subscribe( resp => {
          this.pelicula = resp;
        });

    this.moviesService.getActoresDetalles(this.id)
        .subscribe( resp => {
          this.actores = resp.cast;
        });

  }

  regresar(){
    this.modalController.dismiss();
  }

  favorito(){
    const existe = this.dataservice.guardarPeliculas(this.pelicula);
    existe.then(
      existe => this.estadofavorito = (existe) ? 'star' : 'star-outline'
    );
    
    //this.estadofavorito = (existe) ? 'star' : 'star-outline';
  }

}
