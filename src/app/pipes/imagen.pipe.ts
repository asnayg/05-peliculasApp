import { Pipe, PipeTransform } from '@angular/core';
import { environment } from '../../environments/environment';


const url = environment.img;


@Pipe({
  name: 'imagen'
})
export class ImagenPipe implements PipeTransform {

 
  transform(imagen: string, ...args: unknown[]): string {
    if(!imagen)
      return './assets/no-image-banner.jpg';
      
    const urli = `${url}/${imagen}`;
    return urli;
  }

}
