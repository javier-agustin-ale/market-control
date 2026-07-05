import { Component, Inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-delete-product-dialog',
  imports: [MatDialogModule, MatButtonModule],
  templateUrl: './delete-product-dialog.component.html',
  styleUrl: './delete-product-dialog.component.scss',
  standalone: true,
})
export class DeleteProductDialogComponent {
  constructor(
    readonly dialogRef: MatDialogRef<DeleteProductDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public productName: string
  ) {}
}
