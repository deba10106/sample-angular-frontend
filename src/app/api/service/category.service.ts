import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { ApiConfiguration } from 'src/app/api/api-configuration';
import {Category} from "../model/category";
import {Product} from "../model/product";


@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  private url: string;

  constructor(
    config: ApiConfiguration,
    private http: HttpClient
  ) {
    this.url = config.rootUrl
  }

  getDepartments(): Observable<Array<Category>>  {

    return this.http.get<any>(this.url + 'category/depts/')
      .pipe(
        retry(1),
        catchError(this.handleError)
      );
  }
  getChildCategory(id: string): Observable<Array<Category>>  {

    return this.http.get<any>(this.url + 'category/subcategory/?id='+id)
      .pipe(
        retry(1),
        catchError(this.handleError)
      );
  }

  createChildCategory(id: string, name:string):Observable<Category>{
    let token = localStorage.getItem('token');
    const httpOptions = {
      headers: new HttpHeaders({
        'authorization': token,
        'Accept': '*/*'
      })
    };
    return this.http.post<any>(this.url+ 'category/'+id, name)
      .pipe(
        retry(1),
        catchError(this.handleError)
      )
  }

  createDept(name:string):Observable<Category>{
    let token = localStorage.getItem('token');
    const httpOptions = {
      headers: new HttpHeaders({
        'authorization': token,
        'Accept': '*/*'
      })
    };
    return this.http.post<any>(this.url+ 'category/dept/?name='+name,name)
      .pipe(
        retry(1),
        catchError(this.handleError)
      )
  }

  deleteCategory(id: string): Observable<any> {
    let token = localStorage.getItem('token');
    const httpOptions = {
      headers: new HttpHeaders({
        'authorization': token
      })
    };
    return this.http.delete<any>(this.url + 'category/id/' + id)
      .pipe(
        retry(1),
        catchError(this.handleError)
      )
  }

  // Error handling
  handleError(error) {
    let errorMessage = '';
    if(error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.message;
    } else {
      // Get server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    window.alert(errorMessage);
    return throwError(errorMessage);
  }
}
