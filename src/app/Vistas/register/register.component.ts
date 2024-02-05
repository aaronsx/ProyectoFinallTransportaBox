import { Component, ElementRef, Renderer2 } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AutenticacionService } from 'src/app/Servicios/autenticacion.service';
import { CambioFondoService } from 'src/app/Servicios/cambio-fondo.service';
import { FirebaseService } from 'src/app/Servicios/firebase.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  formregister = this.formBuilder.group({
    nombre: ['',[ Validators.required, Validators.minLength(3)]],
    apellidos: ['', [Validators.required, Validators.maxLength(15)]],
    email: ['', [Validators.required, Validators.email]],
    telefono: ['', [Validators.required,Validators.maxLength(9)]],
    pass: ['', [Validators.required]]  
  })

  // Propiedades booleanas para indicar si cada campo tiene valor
  hasNombre: boolean = false;
  hasApellidos: boolean = false;
  hasEmail: boolean = false;
  hasTelefono: boolean = false;
  hasPass: boolean = false;

  constructor(private formBuilder: FormBuilder, 
    private fondoService: CambioFondoService, 
    private renderer: Renderer2, private el: ElementRef, 
    public authService: AutenticacionService,
    private fbs:FirebaseService) {}

  ngOnInit(): void {
    this.fondoService.cambiarFondoConImagen(this.renderer, this.el, 'assets/fondoalreves.jpg');
    this.subscribeToValueChanges();
  }

  // Añade observadores para cada campo para actualizar las propiedades booleanas
  private subscribeToValueChanges(): void {
    
    this.formregister.controls['nombre']?.valueChanges.subscribe((value) => {
      this.hasNombre = !!value;
    });

    this.formregister.controls['apellidos']?.valueChanges.subscribe((value) => {
      this.hasApellidos = !!value;
    });

    

    this.formregister.controls['email']?.valueChanges.subscribe((value) => {
      this.hasEmail = !!value;
    });

    this.formregister.controls['telefono']?.valueChanges.subscribe((value) => {
      this.hasTelefono = !!value;
    });

    this.formregister.controls['pass']?.valueChanges.subscribe((value) => {
      this.hasPass = !!value;
    });
  }

  enviar() {
    //Swal es un tipo de alertas realizada si se borra o no el usuario
    this.fbs.setFireBase(this.formregister.value,'Usuario').then(() =>

    Swal.fire({
      title: "Guardado!",
      text: "Usuario ha sido guardado",
      icon: 'success'
    }))
    .catch(()=> Swal.fire({
      title: "Oops...!",
      text: "El usuario no ha sido guardado",
      icon: 'error'
    }));
    this.authService.SignUp(this.formregister.value.email || "", this.formregister.value.pass|| "");
        console.log("email "+this.formregister.value.email);
        console.log("nombre "+this.formregister.value.nombre);
        console.log("pass "+this.formregister.value.pass);
        console.log("apellido "+this.formregister.value.apellidos);
        console.log("tele "+this.formregister.value.telefono);
  }
}
