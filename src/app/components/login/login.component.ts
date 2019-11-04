import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import Swal from 'sweetalert2';

import { Usuario } from 'src/app/models/usuario.model';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public usuario: Usuario = new Usuario();

  constructor(private usuarioService: UsuarioService,
              private router: Router) { }

  ngOnInit() {
  }

  loggear(form: NgForm) {
    console.log(form);
    if(form.invalid) {
      return;
    }

    Swal.fire({
      type: 'info',
      text: 'Cargando, por favor espere',
      allowOutsideClick: false
    });

    Swal.showLoading();

    this.usuarioService.login(this.usuario).subscribe(res => {
      Swal.close();
      this.router.navigate(['/ventas']);
    }, (err) => {
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
