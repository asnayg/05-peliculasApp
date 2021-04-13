import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Peliculas } from 'src/app/interfaces/interfaces';
import { DetallesComponent } from '../detalles/detalles.component';

@Component({
  selector: 'app-slideshow-poster',
  templateUrl: './slideshow-poster.component.html',
  styleUrls: ['./slideshow-poster.component.scss'],
})
export class SlideshowPosterComponent implements OnInit {
 
  slideOptios = {
    slidesPerView: 3.3,
    freeMode: true
  };

  @Input() peliculas: Peliculas[] = [];
  constructor(private modalController: ModalController) { }

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
