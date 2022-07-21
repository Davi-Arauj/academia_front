import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpClient } from '@angular/common/http';
import { Product, Total } from './product.model';
import { Observable, EMPTY } from 'rxjs';
import { map, catchError } from "rxjs/operators";
import { Page, QueryBuilder } from 'src/app/util/pagination';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  baseUrl = "v2/cadastros/produtos";
  baseUrlID = "v2/cadastros/produto";
  
  constructor(private snackBar: MatSnackBar,
    private http: HttpClient,
    private router: Router
  ) { }

  showMessage(msg: string, isError: boolean = false): void {
    this.snackBar.open(msg, "X", {
      duration: 3000,
      horizontalPosition: "right",
      verticalPosition: "top",
      panelClass: isError ? ["msg-error"] : ["msg-success"],
    });
  }

  create(product: any): Observable<Product> {
    return this.http.post<Product>(this.baseUrl, product).pipe(
      map((obj) => obj),
      catchError((e) => this.errorHandler(e))
    );
  }

  read(queryBuilder: QueryBuilder): Observable<Page<Product>> { 
    return this.http
    .get<Product[]>(`${this.baseUrl}?${queryBuilder.buildQueryString()}`,{observe: 'response'})
    .pipe(
      map((response) => <Page<Product>>Page.fromResponse(response)),
      catchError((e) => this.errorHandler(e))
    );
  }

  readById(codigo_barras: string): Observable<Product> {
    const url = `${this.baseUrlID}/${codigo_barras}`
    return this.http.get<Product>(url).pipe(
      map((obj) => obj),
      catchError((e) => this.errorHandler(e))
    );
  }

  update(product: Product, codigo_barras: string): Observable<Product> {
    const url = `${this.baseUrlID}/${codigo_barras}`
    return this.http.put<Product>(url, product).pipe(
      map((obj) => obj),
      catchError((e) => this.errorHandler(e))
    );
  }

  delete(codigo_barras: number): Observable<Product> {
    const url = `${this.baseUrlID}/${codigo_barras}`
    return this.http.delete<Product>(url).pipe(
      map((obj) => obj),
      catchError((e) => this.errorHandler(e))
    );
  }

  total():Observable<Total>{
    const url = `${this.baseUrl}/total`
    
    return this.http.get<Total>(url).pipe(
      map((obj) => obj),
      catchError((e) => this.errorHandler(e))
    );
  }


  cancel() {
    this.router.navigate(['/products'])
  }

  errorHandler(e: any): Observable<any> {
    this.showMessage("Ocorreu um erro!", true);
    return EMPTY;
  }
}
