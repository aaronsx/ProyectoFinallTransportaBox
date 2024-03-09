import { Component, ElementRef, Renderer2 } from '@angular/core';
import { CambioFondoService } from 'src/app/Servicios/cambio-fondo.service';
import { FirebaseService } from 'src/app/Servicios/firebase.service';
import { Tienda } from 'src/app/modelo/tienda';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-tienda',
  templateUrl: './tienda.component.html',
  styleUrls: ['./tienda.component.css']
})
export class TiendaComponent {

  // Lista donde guardaremos las tiendas
  tiendas: Tienda[] = [];
  constructor( 
    private fondoService: CambioFondoService, 
    private renderer: Renderer2, private el: ElementRef,
    private fbs:FirebaseService) {}

  ngOnInit(): void {
    this.fondoService.cambiarFondoConImagen(this.renderer, this.el, 'assets/tienda.jpg');

    // Obtenemos todos las tiendas de la base de datos
    this.fbs.getFireBasePorCampo("Tienda","id_usuario",localStorage.getItem("idUsuario")).subscribe(res => {
      // Guardamos los usuarios en la lista tiendas
      this.tiendas = res;
      
    });
  }

   //Eliminamos tienda
   eliminarTienda(tienda: Tienda) {
    
      // Borramos la tienda de la base de datos
      this.fbs.deleteFireBase(tienda, 'Tienda')
        .then(() => Swal.fire({
          title: "Borrado",
          text: "Borrado con éxito!!",
          icon: "success"
        }))
        .catch(() => Swal.fire({
          title: "Oops..",
          text: "Se ha producido un error.",
          icon: "error"
        }));
    }
  }

