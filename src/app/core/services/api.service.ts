import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private http: HttpClient) { }

  private static formatErrors(error: any) {
    return throwError(() => error.error);
  }

  get(path: string, params: HttpParams = new HttpParams()): Observable<any> {
    return this.http.get(`${environment.api_url}${path}`, { params })
      .pipe(catchError(ApiService.formatErrors));
  }

 getBlob(path: string, params: HttpParams = new HttpParams()): Observable<any> {
    return this.http.get(`${environment.api_url}${path}`, { responseType: 'blob', params })
      .pipe(catchError(ApiService.formatErrors));
  }

  patch(path: string, body: Object = {}): Observable<any> {
    return this.http.patch(
      `${environment.api_url}${path}`,
      body,
    ).pipe(catchError(ApiService.formatErrors));
  }

  post(path: string, body: Object = {}): Observable<any> {
    return this.http.post(
      `${environment.api_url}${path}`,
      body,
    ).pipe(catchError(ApiService.formatErrors));
  }

  delete(path: string): Observable<any> {
    return this.http.delete(
      `${environment.api_url}${path}`,
    ).pipe(catchError(ApiService.formatErrors));
  }
  deleteBody(path: string,body: Object = {}): Observable<any> {
    return this.http.delete(
      `${environment.api_url}${path}`,
      { body: body }
    ).pipe(catchError(ApiService.formatErrors));
  }
  postWithFile(path: string, data?: FormData): Observable<any> {
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'multipart/form-data');
  
    // Usar la opción 'headers' para configurar los encabezados en la solicitud
    const options = {
      headers,
      reportProgress: true,
    };
  
    return this.http.post(`${environment.api_url}${path}`, data,options)
      .pipe(catchError(ApiService.formatErrors));
  }
}
