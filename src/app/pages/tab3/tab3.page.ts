import { Component, OnInit } from '@angular/core';
import { PeliculaDetalle, Genre, Peliculas } from '../../interfaces/interfaces';
import { DataLocalService } from '../../services/data-local.service';
import { MoviesService } from '../../services/movies.service';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page  {

  peliculas : PeliculaDetalle[] = [];
  generos: Genre[]=[];

  favoritoGenero: any[] = [{
    genero: 'Accion',
    pelis: []
  }];

  constructor(private dataService: DataLocalService, 
              private movieServices: MoviesService) {}

  

  async ionViewWillEnter() {
    this.peliculas = await this.dataService.cargarFavoritos();
    this.generos = await this.movieServices.cargarGeneros();

    this.pelisPorgenero(this.generos, this.peliculas);
  }

  pelisPorgenero(generos: Genre[], peliculas: PeliculaDetalle[] ){
    this.favoritoGenero = [];
    generos.forEach( genero =>{
      this.favoritoGenero.push({
        genero: genero.name,
        pelis: peliculas.filter( p => {
           return p.genres.find( g => g.id === genero.id ); 
        })
      });
    });
    console.log(this.favoritoGenero);

  }

}
