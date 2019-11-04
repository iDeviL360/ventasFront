import { Component, OnInit } from '@angular/core';
import { Cliente } from 'src/app/models/cliente.model';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-cliente',
  templateUrl: './cliente.component.html',
  styles: []
})
export class ClienteComponent implements OnInit {

  public cliente: Cliente = new Cliente();

  constructor(private dialogRef: MatDialogRef<ClienteComponent>) { }

  ngOnInit() {

  }

  onSubmit(form: NgForm) {
    if(form.invalid) {
      return;
    }

    this.dialogRef.close(this.cliente);
  }

  onClose() {
    this.dialogRef.close();
  }

}
