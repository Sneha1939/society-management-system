import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {

  private apiUrl = 'http://localhost:3000/services';

  constructor(private http: HttpClient) {}

  getServices(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  createService(service: any): Observable<any> {
    return this.http.post(this.apiUrl, service);
  }

  updateService(id: number, service: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, service);
  }
}