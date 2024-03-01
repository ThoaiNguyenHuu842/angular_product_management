import { Component, ViewChild, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule, MatTable } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import {
  MatDialog
} from '@angular/material/dialog';
import { AddProductComponent } from '../add-product-dialog/add-product.component';
import { MatIconModule } from '@angular/material/icon';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../product.service';
import { Subscription } from 'rxjs';
import { HttpClientModule } from '@angular/common/http';
import {MatSelectModule} from '@angular/material/select';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { Product } from '../product';
import { FormsModule } from '@angular/forms';
import { ConfirmDialogModel, ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';


@Component({
  selector: 'angular-material-ui-list-product',
  standalone: true,
  imports: [CommonModule, MatTableModule, MatButtonModule,
    MatSelectModule, MatInputModule, MatFormFieldModule,
    MatIconModule, HttpClientModule, FormsModule],
  templateUrl: './list-product.component.html',
  styleUrl: './list-product.component.scss',
})
export class ListProductComponent implements OnInit {
  displayedColumns: string[] = ['name', 'category', 'buttons'];
  categories: string[] = [];
  selectedCategory = 'All';
  dataSource: Product[] = [];
  productName: String = '';
  companyId: Number = 0;
  @ViewChild(MatTable, { static: true }) table!: MatTable<any>;


  private _sub:Subscription = new Subscription();

  constructor(public dialog: MatDialog, private route: ActivatedRoute, private productService:ProductService) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.companyId = params['id'];
      this.loadCategories();
      this.loadProducts();
    });
    
  }

  loadCategories() {
    this._sub.add(this.productService.getCategories(this.companyId).subscribe(
      (result) => {
        this.categories = result;
      }
    ));
  }

  loadProducts() {
    const catetory = this.selectedCategory === 'All' ? '': this.selectedCategory;
    this._sub.add(this.productService.getProducts(this.companyId, catetory, this.productName).subscribe(
      (result) => {
        console.log(result);
        this.dataSource = result;
      }
    ));
  }

  changeCategory(catetory:String) {
    console.log(catetory);
  }

  openProductDialog(product?: Product): void {
    const dialogRef = this.dialog.open(AddProductComponent, {
      data: {
        categories: this.categories,
        product: product
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result && result.data) {
        if (product) {
          this._sub.add(this.productService.updateProduct(this.companyId, product.id, result.data).subscribe(
            () => {
              this.loadProducts();
              this.table.renderRows();
            }
          ));
        } else {
          this._sub.add(this.productService.createProduct(this.companyId, result.data).subscribe(
            () => {
              this.loadProducts();
              this.table.renderRows();
            }
          ));
        }       
      }
    });
  }

  confirmDialog(id: Number): void {
    const message = `Are you sure you want to delete this product?`;
    const dialogData = new ConfirmDialogModel("Confirm Action", message);
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      maxWidth: "400px",
      data: dialogData
    });

    dialogRef.afterClosed().subscribe(confirmed => {
      if (confirmed) {
        this._sub.add(this.productService.deleteProduct(this.companyId, id).subscribe(
          () => {
            this.loadProducts();
            this.table.renderRows();
          }
        ));
      }
    });
  }
}
