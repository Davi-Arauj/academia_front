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
    codigo_barras: 123,
    nome: "Davi",
    descricao: "Davi",
    foto: "antoniooo",
    valorpago: 123,
    valorvenda: 123,
    qtde: 123,
    und_cod: 123,
    cat_cod:123,
    scat_cod:123
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
