import { Injectable } from '@angular/core';
import { Observable, EMPTY } from 'rxjs';
import { Product } from '../product/product.model';
import { map } from 'rxjs/operators';
import { catchError } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class SaleService {

  baseUrl = "https://meuboteco.herokuapp.com/api/v1/product";

  constructor(private snackBar: MatSnackBar,
    private http: HttpClient,
    private router: Router) { }
   
   
    showMessage(msg: string, isError: boolean = false): void {
      this.snackBar.open(msg, "X", {
        duration: 3000,
        horizontalPosition: "right",
        verticalPosition: "top",
        panelClass: isError ? ["msg-error"] : ["msg-success"],
      });
    }

  readById(id: string): Observable<Product> {
    const url = `${this.baseUrl}/${id}`
    return this.http.get<Product>(url).pipe(
      map((obj) => obj),
      catchError((e) => this.errorHandler(e))
    );
  }

  errorHandler(e: any): Observable<any> {
    this.showMessage("Ocorreu um erro!", true);
    return EMPTY;
  }
}
