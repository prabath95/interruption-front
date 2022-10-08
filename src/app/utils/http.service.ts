import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class HttpService {
  constructor(private httpClient: HttpClient) {}

  /**
   * Setting Headers for API Request
   */
  private setHeaders(): HttpHeaders {
    const headersConfig = {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    };
    return new HttpHeaders(headersConfig);
  }

  /**
   * format errors
   */
  private formatErrors(error: any) {
    return throwError(error.error);
  }

  /**
   * Generic get method
   * @param path 
   * @param params 
   * @returns 
   */
  get(path: string, params?: any): Observable<any> {
    return this.httpClient
      .get(path, {
        headers: this.setHeaders(),
        params,
      })
      .pipe(
        map((res) => res),
        catchError(this.formatErrors)
      );
  }

  /**
   * Generic post method
   * @param path 
   * @param body 
   * @param params 
   * @returns 
   */
  post(path: string, body: any, params?: any): Observable<any> {
    return this.httpClient
      .post(path, JSON.stringify(body), {
        headers: this.setHeaders(),
        params,
      })
      .pipe(
        map((res) => res),
        catchError(this.formatErrors)
      );
  }

  /**
   * Generic put method
   * @param path 
   * @param body 
   * @param params 
   * @returns 
   */
  put(path: string, body?: any, params?: any): Observable<any> {
    return this.httpClient
      .put(path, JSON.stringify(body), {
        headers: this.setHeaders(),
        params,
      })
      .pipe(
        map((res) => res),
        catchError(this.formatErrors)
      );
  }

  /**
   * Generic delete method
   * @param path 
   * @param params 
   * @returns 
   */
  delete(path: string, params?: any): Observable<any> {
    return this.httpClient
      .delete(path, {
        headers: this.setHeaders(),
        params,
      })
      .pipe(
        map((res) => res),
        catchError(this.formatErrors)
      );
  }
}
