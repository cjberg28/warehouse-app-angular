import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { WarehouseObject } from './models/WarehouseObject';

@Injectable({
  providedIn: 'root'
})
export class WarehouseApiService {

  http :HttpClient;
  getRequestURL :string = environment.getRequestURL;
  postRequestURL :string = environment.postRequestURL;
  putRequestURL :string = environment.putRequestURL;
  deleteRequestURL :string = environment.deleteRequestURL;

  constructor(http :HttpClient) {
    this.http = http;
   }

  /* Every method here should return an Observable because each servlet method returns an object or a message (also an object). */
  findAll() :Observable<any> {
    return this.http.get(this.getRequestURL).pipe(catchError(this.handleError));
  }

  findBySlotId(id :number) :Observable<any> {
    return this.http.get(this.getRequestURL + id).pipe(catchError(this.handleError));
  }

  findAllOfType(type :string) :Observable<any> {
    return this.http.get(this.getRequestURL + type).pipe(catchError(this.handleError));
  }

  save(warehouseObject :WarehouseObject) :Observable<any> {
    return this.http.post(this.postRequestURL, warehouseObject).pipe(catchError(this.handleError));
  }

  update(warehouseObject :WarehouseObject) :Observable<any> {
    return this.http.put(this.putRequestURL, warehouseObject).pipe(catchError(this.handleError));
  }

  delete(id :number) :Observable<any> {
    return this.http.delete(this.deleteRequestURL + id).pipe(catchError(this.handleError));
  }

  private handleError(error :HttpErrorResponse) {
    // translate the HTTP error code into a Stacktrace
    console.log(error);
    return throwError(() => {
      throw new Error(); // create a stacktrace
    }); // return empty Observable
  }
}
