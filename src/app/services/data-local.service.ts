import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';

import { Storage } from '@ionic/storage-angular';
import { PeliculaDetalle } from '../interfaces/interfaces';

@Injectable({
  providedIn: 'root'
})
export class DataLocalService {

  peliculas: PeliculaDetalle[] = [];

  private _storage: Storage | null = null;


  constructor(private mystorage: Storage,
               private toastController: ToastController ) { 
      this.init();
      this.cargarFavoritos();
  }

  async init() {
    // If using, define drivers here: await this.storage.defineDriver(/*...*/);
    const storage = await this.mystorage.create();
    this._storage = storage;
  }

  public set(key: string, value: any) {
    this._storage?.set(key, value);
  }
  
  async presentToast(mensaje: string) {
    const toast = await this.toastController.create({
      message: mensaje,
      duration: 1000
    });
    toast.present();
  }

  async  guardarPeliculas( pelicula : PeliculaDetalle) {
    let existe = false;
    let mensaje = '';
    for(const peli of this.peliculas ){
      if( peli.id === pelicula.id){
        existe = true;
        break;
      }
    }

    if( existe ){
      this.peliculas = this.peliculas.filter(peli => peli.id !== pelicula.id);
      mensaje = 'removido de favorito';
    }else
    {
      this.peliculas.push(pelicula);
      mensaje = 'Agregada a favorito';
    }
    this.presentToast(mensaje);
    this.set('peliculas', this.peliculas);

    return !existe;
    // If using a custom driver:
    // await this.storage.defineDriver(MyCustomDriver)
    // await this.storage.create();
  }

  async cargarFavoritos(){
    const peliculas = await this._storage?.get('peliculas');
    this.peliculas = peliculas || [];
    return this.peliculas;
  }

  async existePelicula(id: number){
    //id = Number(id);
    await this.cargarFavoritos();
    const existe = this.peliculas.find(peli => peli.id === id);
    
    return (existe) ? true : false;
  }

}
