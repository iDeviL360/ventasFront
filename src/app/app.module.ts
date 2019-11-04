import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http'; 
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';

//Angular Material
import { MaterialModule } from './material/material.module';

//Rutas
import { AppRoutingModule } from './app-routing.module';

//Componentes
import { AppComponent } from './app.component';
import { VentaComponent } from './components/venta/venta.component';
import { VentaItemsComponent } from './components/venta-items/venta-items.component';
import { VentasComponent } from './components/ventas/ventas.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { ClienteComponent } from './components/cliente/cliente.component';
import { HomeComponent } from './components/home/home.component';


@NgModule({
  entryComponents: [
    VentaItemsComponent,
    ClienteComponent
  ],
  declarations: [
    AppComponent,
    VentaComponent,
    VentaItemsComponent,
    VentasComponent,
    LoginComponent,
    RegisterComponent,
    NavbarComponent,
    ClienteComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    MaterialModule,
    ToastrModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
