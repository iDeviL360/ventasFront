import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { VentaComponent } from './components/venta/venta.component';
import { VentasComponent } from './components/ventas/ventas.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { AuthGuard } from './guards/auth.guard';
import { HomeComponent } from './components/home/home.component';

const APP_ROUTES: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'venta', component: VentaComponent, canActivate:[AuthGuard] },
  { path: 'venta/:ventaid', component: VentaComponent, canActivate:[AuthGuard] },
  { path: 'ventas', component: VentasComponent, canActivate:[AuthGuard] },
  { path: 'login', component: LoginComponent },
  { path: 'registro', component: RegisterComponent },
  { path: '**', pathMatch: 'full', redirectTo: 'home'}
]


@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot(APP_ROUTES, { useHash: true }),
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
