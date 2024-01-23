import { Component, ElementRef, Renderer2 } from '@angular/core';
import { CambioFondoService } from 'src/app/Servicios/cambio-fondo.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  constructor(private fondoService: CambioFondoService,private renderer: Renderer2, private el: ElementRef) {}

  ngOnInit(): void {
    this.fondoService.cambiarFondoConImagen(this.renderer, this.el, 'assets/fondoalreves.jpg');
  }
}