import { Component, OnInit } from '@angular/core';
import { UsuarioService } from 'src/app/services/usuario.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styles: [`
  
  .espaciado {
    flex: 1 1 auto;
  }

  `]
})
export class NavbarComponent implements OnInit {

  constructor(public usuarioService: UsuarioService,
              public router: Router) { }

  ngOnInit() {
    
  }

  logout() {
    this.usuarioService.logout();
    this.router.navigateByUrl("/login");
  }

}
