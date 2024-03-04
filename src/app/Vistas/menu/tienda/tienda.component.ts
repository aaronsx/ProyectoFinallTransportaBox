import { Component, ElementRef, Renderer2 } from '@angular/core';
import { CambioFondoService } from 'src/app/Servicios/cambio-fondo.service';

@Component({
  selector: 'app-tienda',
  templateUrl: './tienda.component.html',
  styleUrls: ['./tienda.component.css']
})
export class TiendaComponent {

  constructor( 
    private fondoService: CambioFondoService, 
    private renderer: Renderer2, private el: ElementRef) {}

  ngOnInit(): void {
    this.fondoService.cambiarFondoConImagen(this.renderer, this.el, 'assets/tienda.jpg');
  }
}
