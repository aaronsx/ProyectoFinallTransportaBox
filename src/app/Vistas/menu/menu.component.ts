import { Component, ElementRef, Renderer2, inject } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { AsyncPipe, NgIf } from '@angular/common';
import { CambioFondoService } from 'src/app/Servicios/cambio-fondo.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent {
  private breakpointObserver = inject(BreakpointObserver);

  constructor( 
    private fondoService: CambioFondoService, 
    private renderer: Renderer2, private el: ElementRef) {}

  ngOnInit(): void {
    this.fondoService.cambiarFondoConImagen(this.renderer, this.el, 'assets/Camiones.png');
  }

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );
}