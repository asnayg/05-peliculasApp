import { Component } from '@angular/core';

import { MoviesService } from '../../services/movies.service';
import { Peliculas } from '../../interfaces/interfaces';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  peliculasRecientes: Peliculas[] = [];
  populares: Peliculas[] = [];

  constructor( private moviesService: MoviesService ) {}

  ngOnInit(): void {
    this.moviesService.getFeatures()
        .subscribe( ({results}) => {
           this.peliculasRecientes = results;
        });

    this.getPopulares();
  }

  getPopulares(){
    //populares 
    this.moviesService.getPopulares()
    .subscribe( resp => {
      //this.populares = resp.results;
      //this.populares.push(...resp.results);
      const arrTemp = [...this.populares, ...resp.results];
      this.populares = arrTemp;
    });
  }

  cargarMas(){
    this.getPopulares();
  }

}
