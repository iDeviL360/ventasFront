import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

import { Usuario } from 'src/app/models/usuario.model';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['../login/login.component.css']
})
export class RegisterComponent implements OnInit {

  public usuario: Usuario = new Usuario();

  constructor(private usuarioService: UsuarioService,
              private router: Router) { }

  ngOnInit() {

  }

  registrar(form: NgForm) {
    if(form.invalid) {
      return;
    }

    Swal.fire({
      type: 'info',
      text: 'Cargando, por favor espere',
      allowOutsideClick: false
    });

    Swal.showLoading();

    this.usuarioService.registrarUsuario(this.usuario).subscribe((res:any) => {
      Swal.close();
      this.router.navigate(['/ventas']);
    }, (err:any) => {
      Swal.fire({
        title: 'Ventas App',
        type: 'error',
        text: err.error.message,
        allowEscapeKey: true,
        showCloseButton: true 
      })
    })
  }

}
