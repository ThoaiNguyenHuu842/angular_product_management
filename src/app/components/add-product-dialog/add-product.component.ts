import {Component, Inject} from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import {MatSelectModule} from '@angular/material/select';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { FormControl, FormGroup } from '@angular/forms';
import { Product } from '../product';
import { FormsModule, ReactiveFormsModule,Validators  } from '@angular/forms';
import {
  MAT_DIALOG_DATA,
  MatDialogRef,
  MatDialogTitle,
  MatDialogContent,
  MatDialogActions,
  MatDialogClose,
  MatDialogModule 
} from '@angular/material/dialog';

@Component({
  selector: 'angular-material-ui-add-product',
  standalone: true,
  imports: [
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatDialogClose,
    CommonModule,
    MatButtonModule,
    ReactiveFormsModule,
    FormsModule],
  templateUrl: './add-product.component.html',
  styleUrl: './add-product.component.scss',
})
export class AddProductComponent {
  
  productForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    category: new FormControl('', [Validators.required])
  });

  productId: Number = 0;

  categories: String[] = [];

  constructor(
    public dialogRef: MatDialogRef<AddProductComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {
    this.categories = data.categories;
    if (data.product) {
      this.productId = data.product.id;
      this.productForm.setValue({
        name: data.product.name,
        category: data.product.category
      });
    }
  }

  onSubmit(): void {
    this.dialogRef.close({data:this.productForm.value})  
  }

}
