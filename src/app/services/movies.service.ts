import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RespuestaMDB, PeliculaDetalle, RespuestaCredits, Genre } from '../interfaces/interfaces';
import { environment } from 'src/environments/environment';

const myUrl = environment.url;
const apiKey = environment.apikey;

@Injectable({
  providedIn: 'root'
})
export class MoviesService {
  
  private pupularesPape = 0;
  generos: Genre[] =[];

  constructor(
      private http: HttpClient
  ) 
  { }

  // https://api.themoviedb.org/3/discover/movie?primary_release_date.gte=2019-09-15
  //&primary_release_date.lte=2019-10-22
  //&api_key=7cd69f83ceba05bf88c59d79be1e9008&language=es`);

  private ejecutarConsulta<T>(consulta : string ){
    consulta = myUrl + consulta;
    consulta += `&api_key=${apiKey}&language=es`;
    return this.http.get<T>(consulta);

  }

  getFeatures(){
      //return this.http.get<RespuestaMDB>(`https://api.themoviedb.org/3/discover/movie?primary_release_date.gte=2019-09-15&primary_release_date.lte=2019-10-22&api_key=7cd69f83ceba05bf88c59d79be1e9008&language=es`);
      return this.ejecutarConsulta<RespuestaMDB>('/discover/movie?primary_release_date.gte=2019-09-15&primary_release_date.lte=2019-10-22');
  }

  getPopulares(){
    this.pupularesPape++;
    const q= `/discover/movie?sort_by=polpularity.desc&pape=${this.pupularesPape}`
    return this.ejecutarConsulta<RespuestaMDB>(q);
  }

  getPeliculaDetalles(id : number){
    const q= `/movie/${id}?a=1`
    return this.ejecutarConsulta<PeliculaDetalle>(q);
    
  }

  getActoresDetalles(id : number){
    const q= `/movie/${id}/credits?a=1`
    return this.ejecutarConsulta<RespuestaCredits>(q);
    
  }

  buscarPeliculas(texto: string){
    return this.ejecutarConsulta(`/search/movie?query=${texto}`);

  }

  //https://api.themoviedb.org/3/genre/movie/
    //list?api_key=1865f43a0549ca50d341dd9ab8b29f49&language=es&include_image_language=es
  cargarGeneros() : Promise<Genre[]> {
    
    return new Promise( resolve => {
      
      this.ejecutarConsulta(`/genre/movie/list?a=1`)
      .subscribe( resp =>{
        this.generos = resp['genres'];
        resolve (this.generos);
      });

    });

  }


}
