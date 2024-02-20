import { Component, ElementRef, Renderer2 } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AutenticacionService } from 'src/app/Servicios/autenticacion.service';
import { CambioFondoService } from 'src/app/Servicios/cambio-fondo.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  formlogin = this.formBuilder.group({
    email: ['', [Validators.required, Validators.email]],
    pass: ['', [Validators.required]]  
  })
  constructor(private formBuilder: FormBuilder,
    private fondoService: CambioFondoService,
    private renderer: Renderer2, 
    private el: ElementRef,
    private abs:AutenticacionService
    ) {}

  ngOnInit(): void {
    this.fondoService.cambiarFondoConImagen(this.renderer, this.el, 'assets/fondoalreves.jpg');
  }
  //Metodo para hacer login 
  hacerlogin(){
    this.abs.SignIn(this.formlogin.value.email||"",this.formlogin.value.pass||"")
  }

}
