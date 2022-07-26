import { FormGroup, FormBuilder } from '@angular/forms';
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

  formGroupPesquisa: FormGroup;

  constructor(private productService: ProductService, private formBuilder: FormBuilder) { }

  ngOnInit(): void { 
    this.formGroupPesquisa = this.formBuilder.group({
      "nome":[null],
    });
    this.totalProdutos(),
    this.listarProdutos();
  }

  limparPesquisa(){
    this.formGroupPesquisa.reset();
    this.listarProdutos();
  }

  listarProdutos(){

    const queryAdicional = new Map();
    if (this.formGroupPesquisa.value.nome){
      queryAdicional.set("nome", this.formGroupPesquisa.value.nome);
    }
    this.productService.read(
      new PageRequest(
        {
          pageNumber: this.pageEvent? this.pageEvent.pageIndex:0,
          pageSize: this.pageEvent? this.pageEvent.pageSize:0
        },
        {
          property: this.sortEvent ? this.sortEvent.active : "codigo_barras",
          direction: this.sortEvent ? this.sortEvent.direction : "asc",
          sort:this.sortEvent ? this.sortEvent.direction : "asc",
          order:true
        },
        queryAdicional,
        this.offset
                  )
      )
      .subscribe(
      (page: any) => {
        this.page.content = page.content.dados ;
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
      }
    )
  }


}
