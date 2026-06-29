import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ResidentService {

  private apiUrl = 'http://localhost:3000/residents';

  constructor(private http: HttpClient) {}

  getResidents(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  addResident(resident: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, resident);
  }

  deleteResident(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`);
  }
}