import { Component, Input } from '@angular/core';
import jsPDF from 'jspdf';
import { FirebaseService } from 'src/app/Servicios/firebase.service';
import { Tienda } from 'src/app/modelo/tienda';
import { Usuario } from 'src/app/modelo/usuario';

@Component({
  selector: 'app-detalles',
  templateUrl: './detalles.component.html',
  styleUrls: ['./detalles.component.css']
})
export class DetallesComponent {
  @Input() tienda: Tienda | null = null;
  usuario: Usuario = {
    nombre: '', id_acceso: 1, email: '', pass: '', telefono: '',
    apellido: ''
  };
  constructor(
    private fbs:FirebaseService
  ){}
  hacerPdf(tienda: Tienda){
       // Crear instancia de jsPDF
    const pdf = new jsPDF();
    this.fbs.getFireBasePorId('Usuario',tienda.id_usuario!).subscribe(res => {
      // Guardamos el usuario en el objeto usuario
      this.usuario = res;
       // Agregar contenido al PDF (por ejemplo, un título y una lista de elementos)
       pdf.text('Informe de Usuario Tienda', 10, 10);
      pdf.text('Nombre: ' + this.usuario.nombre+' '+this.usuario.apellido, 10, 20);
      pdf.text('Email: ' + this.usuario.email, 10, 30);
      pdf.text('Teléfono: ' + this.usuario.telefono, 10, 40);
      pdf.text('Nombre de la tienda: ' + tienda.tienda, 10, 50);
      pdf.text('Código Postal: ' + tienda.codigoPostal, 10, 60);
      // Obtener los datos del documento como un objeto Blob
       const blobData = pdf.output('blob');
        // Crear una URL de objeto (blob URL)
        const blobURL = URL.createObjectURL(blobData);
        // Descargar el PDF
        pdf.save('informe_'+this.usuario.email+'_'+tienda.tienda+'.pdf');

       // Abrir el PDF en una nueva pestaña
      window.open(blobURL, '_blank');
      
    });
   
    

    
  }
}
