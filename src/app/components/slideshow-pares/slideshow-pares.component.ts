import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Peliculas } from 'src/app/interfaces/interfaces';
import { DetallesComponent } from '../detalles/detalles.component';

@Component({
  selector: 'app-slideshow-pares',
  templateUrl: './slideshow-pares.component.html',
  styleUrls: ['./slideshow-pares.component.scss'],
})
export class SlideshowParesComponent implements OnInit {

  slideOptios = {
    slidesPerView: 3.3,
    freeMode: true,
    spaceBetween:-10
  };

  @Input() peliculas: Peliculas[] = [];
  @Output() cargarMas = new EventEmitter();

  constructor(private modalController: ModalController) { }

  ngOnInit() {}

  onClick(){
    this.cargarMas.emit();
  }

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
