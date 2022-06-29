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
  newProduct: Product = {
    amount: undefined,
    description: "",
    price: undefined
  }
  constructor(
    private productService: ProductService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    var id: any
    id = this.route.snapshot.paramMap.get('id');
    this.productService.readById(id).subscribe(product => {
      this.newProduct = product
    });
  }

  deleteProduct(): void {
    var id :any
    id=this.newProduct.id
    console.log(id)
    this.productService.delete(id).subscribe(()=>{
      this.productService.showMessage("Produto excluido com sucesso!")
      this.router.navigate(['/products'])
    })
  }

  cancel(): void {
    this.router.navigate(['/products'])
  }
}
