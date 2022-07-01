import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpClient } from '@angular/common/http';
import { Product } from './product.model';
import { Observable, EMPTY } from 'rxjs';
import { map, catchError } from "rxjs/operators";


@Injectable({
  providedIn: 'root'
})
export class ProductService {

  baseUrl = "api/v1/products";
  constructor(private snackBar: MatSnackBar,
    private http: HttpClient,
    private router: Router
  ) { }

  page_id : number = 1
  page_size : number = 10


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

  read(): Observable<Product[]> { 
    const url = `${this.baseUrl}?page_id=${this.page_id}&page_size=${this.page_size}`
    return this.http.get<Product[]>(url).pipe(
      map((obj) => obj),
      catchError((e) => this.errorHandler(e))
    );
  }

  readById(id: string): Observable<Product> {
    const url = `${this.baseUrl}/${id}`
    return this.http.get<Product>(url).pipe(
      map((obj) => obj),
      catchError((e) => this.errorHandler(e))
    );
  }

  update(product: Product): Observable<Product> {
    const url = `${this.baseUrl}/${product.id}`
    return this.http.put<Product>(url, product).pipe(
      map((obj) => obj),
      catchError((e) => this.errorHandler(e))
    );
  }

  delete(id: number): Observable<Product> {
    const url = `${this.baseUrl}/${id}`
    return this.http.delete<Product>(url).pipe(
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
