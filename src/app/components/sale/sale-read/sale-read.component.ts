import { Component, OnInit } from '@angular/core';
import { SaleService } from '../sale.service';
import { Product } from '../../product/product.model';

@Component({
  selector: 'app-sale-read',
  templateUrl: './sale-read.component.html',
  styleUrls: ['./sale-read.component.css']
})
export class SaleReadComponent implements OnInit {

  newProduct: Product = {
    amount: undefined,
    description: "",
    price: undefined
  }
  id: string = "";

  productsSale: Product[] = new Array();
  displayedColumns = ['id', 'amount', 'description', 'price', 'action'];


  constructor(private saleService: SaleService) { }

  ngOnInit(): void {

  }
  readPrductById(): void {
    this.saleService.readById(this.id).subscribe(product => {
      this.productsSale.push(product)
      console.log(this.productsSale)

    });
  }



}
