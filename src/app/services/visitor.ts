import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class VisitorService {

  private apiUrl = 'http://localhost:3000/visitors';

  constructor(private http: HttpClient) {}

  getVisitors(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  addVisitor(spoc: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, spoc);
  }

  updateVisitorStatus(id: number, status: string): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${id}/status`, { status });
  }

  deleteVisitor(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`);
  }
}