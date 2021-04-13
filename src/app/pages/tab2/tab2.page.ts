import { Component } from '@angular/core';
import { MoviesService } from '../../services/movies.service';
import { Peliculas } from '../../interfaces/interfaces';
import { ModalController } from '@ionic/angular';
import { DetallesComponent } from 'src/app/components/detalles/detalles.component';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  textoBuscar = '';
  ideas: string[] = ['Spiderman', 'Superman', 'Torh', 'la vida es bella'];
  peliculas: Peliculas[] = [];
  buscando: boolean = false;

  constructor( private movieService: MoviesService,
               private modalController: ModalController) {}


  buscar(evento){
    
    const valor = evento.detail.value;
    if(valor.length === 0 ) {
      this.peliculas = [];
      this.buscando = false;
      return;
    }
    this.buscando = true;
    this.movieService.buscarPeliculas(valor)
      .subscribe( resp => {
        this.buscando = false;
        this.peliculas = resp['results'];
      });

  }

  async detalles(id: number){
    const modal = await this.modalController.create({
      component: DetallesComponent,
      componentProps: {
        id
      }
    });

    modal.present();

  }


}
