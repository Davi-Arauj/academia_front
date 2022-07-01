import { ProductService } from './../product.service';
import { Component, OnInit } from '@angular/core';
import { Product } from '../product.model';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-product-create',
  templateUrl: './product-create.component.html',
  styleUrls: ['./product-create.component.css']
})
export class ProductCreateComponent implements OnInit {
 
  newProduct: any;

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.newProduct = {};
  }

  createdProduct(frm: FormGroup): void {
    
     this.productService.create(this.newProduct).subscribe(() => {
      this.productService.showMessage("Produto criado com sucesso!")
      frm.reset();
      this.productService.cancel()

    })
  }
  cancel() {
    this.productService.cancel()
  }
}
