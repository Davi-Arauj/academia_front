import { ProductService } from './../product.service';
import { Component, OnInit } from '@angular/core';
import { Product } from '../product.model';

@Component({
  selector: 'app-product-create',
  templateUrl: './product-create.component.html',
  styleUrls: ['./product-create.component.css']
})
export class ProductCreateComponent implements OnInit {
  newProduct: Product = {
    amount: undefined,
    description: "",
    price: undefined
  }
  constructor(private productService: ProductService) { }

  ngOnInit(): void {
  }

  createdProduct(): void {
    this.productService.create(this.newProduct).subscribe(() => {
      this.productService.showMessage("Produto criado com sucesso!")
      this.productService.cancel()

    })
  }
  cancel() {
    this.productService.cancel()
  }
}
