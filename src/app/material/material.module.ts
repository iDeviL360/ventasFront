import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogModule,
         MatToolbarModule,
         MatIconModule,
         MatTableModule,
         MatPaginatorModule, 
         MatSortModule, 
         MatTooltipModule,
         MatButtonModule,
         MatInputModule } from '@angular/material';




@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    MatDialogModule,
    MatToolbarModule,
    MatIconModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatTooltipModule,
    MatButtonModule,
    MatInputModule
  ],
  exports: [
    MatDialogModule,
    MatToolbarModule,
    MatIconModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatTooltipModule,
    MatButtonModule,
    MatInputModule
  ]
})
export class MaterialModule { }
