import { Component, OnInit } from '@angular/core';
import { Product } from '../product.model';
import { ProductService } from '../product.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-product-delete',
  templateUrl: './product-delete.component.html',
  styleUrls: ['./product-delete.component.css']
})
export class ProductDeleteComponent implements OnInit {
  newProduct: Product = { }
  constructor(
    private productService: ProductService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    var codigo_barras: any
    codigo_barras = this.route.snapshot.paramMap.get('codigo_barras');
    this.productService.readById(codigo_barras).subscribe(product => {
      this.newProduct = product
    });
  }

  deleteProduct(): void {
    var codigo_barras :any
    codigo_barras=this.newProduct.codigo_barras
    this.productService.delete(codigo_barras).subscribe(()=>{
      this.productService.showMessage("Produto excluido com sucesso!")
      this.router.navigate(['/products'])
    })
  }

  cancel(): void {
    this.router.navigate(['/products'])
  }
}
