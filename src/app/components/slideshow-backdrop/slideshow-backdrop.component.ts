import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Peliculas } from '../../interfaces/interfaces';
import { DetallesComponent } from '../detalles/detalles.component';

@Component({
  selector: 'app-slideshow-backdrop',
  templateUrl: './slideshow-backdrop.component.html',
  styleUrls: ['./slideshow-backdrop.component.scss'],
})
export class SlideshowBackdropComponent implements OnInit {

  slideOptios = {
    slidesPerView: 1.3,
    freeMode: true
  };


  @Input() peliculas: Peliculas[] = [];

  constructor( private modalController: ModalController ) { }

  ngOnInit() {}

  async verDetalles(id: number){
    const modal = await this.modalController.create({
      component: DetallesComponent,
      componentProps: {
        id
      }
    });

    modal.present();

  }

}
