import { Injectable, Renderer2 } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CambioFondoService {
  constructor() {}

  cambiarFondoConImagen(renderer: Renderer2, componente: any, url: string): void {
    renderer.setStyle(document.body, 'background-image', `url(${url})`);
    renderer.setStyle(document.body, 'background-size', 'cover');
  }
}
