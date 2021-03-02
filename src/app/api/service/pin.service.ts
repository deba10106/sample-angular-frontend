import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse, HttpRequest } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { ApiConfiguration } from 'src/app/api/api-configuration';
import { Pin } from 'src/app/api/models';

@Injectable({
  providedIn: 'root'
})
export class PinService {
  private url: string;

  constructor(

    private config: ApiConfiguration,
    private http: HttpClient
  ) {
    //this.url = config.rootUrl + 'account' + config.apiVersion + 'accounts'
    this.url = 'http://127.0.0.1:8080/user/recovery';
  }

  createPin(pin: Pin): Observable<any> {
    //console.log(pin);
    return this.http.post<any>(this.url, pin)
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
    //this.modalService.alert('Error', errorMessage, 'danger');
    window.alert(errorMessage);
    return throwError(errorMessage);
  }
}
