import { Component, ElementRef, Renderer2 } from '@angular/core';
import { CambioFondoService } from 'src/app/Servicios/cambio-fondo.service';

@Component({
  selector: 'app-administracion',
  templateUrl: './administracion.component.html',
  styleUrls: ['./administracion.component.css']
})
export class AdministracionComponent {

  constructor( 
    private fondoService: CambioFondoService, 
    private renderer: Renderer2, private el: ElementRef) {}

  ngOnInit(): void {
    this.fondoService.cambiarFondoConImagen(this.renderer, this.el, 'assets/Camiones.png');
  }
}
