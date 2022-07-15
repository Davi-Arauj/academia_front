import { Product, Total } from './../product.model';
import { Component, OnInit } from '@angular/core';
import { ProductService } from '../product.service';
import { PageEvent } from '@angular/material/paginator';
import { Page, PageRequest } from 'src/app/util/pagination';
import { Sort } from '@angular/material/sort';
@Component({
  selector: 'app-product-read',
  templateUrl: './product-read.component.html',
  styleUrls: ['./product-read.component.css'],
})
export class ProductReadComponent implements OnInit {

  displayedColumns = ['codigo_barras', 'nome', 'quantidade', 'valor_venda','action'];
  
  page: Page<Product> = new Page([],0);
  pageEvent: PageEvent;
  sortEvent: Sort;
  total: number = 0;
  offset: number = 0;

  constructor(private productService: ProductService) { }

  ngOnInit(): void { 
    this.totalProdutos(),
    this.listarProdutos();
  }

  listarProdutos(){

    let queryAdicional;
    this.productService.read(
      new PageRequest(
        {
          pageNumber: this.pageEvent? this.pageEvent.pageIndex:0,
          pageSize: this.pageEvent? this.pageEvent.pageSize:5
        },
        {
          property: this.sortEvent ? this.sortEvent.active : "id",
          direction: this.sortEvent ? this.sortEvent.direction : "asc",
        },
        queryAdicional,
        this.offset
                  )
      )
      .subscribe(
      (page: any) => {
        this.page.content = page.content.dados ;
        console.log(page.content)
      },
      (error) => {
        this.page = new Page([],0);
      }
    )
  }

  totalProdutos(){
    this.productService.total()
    .subscribe(
      (total :any) => {
        this.total = total.total;
        console.log(this.total)
      }
    )
  }


}
