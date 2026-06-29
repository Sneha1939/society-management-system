import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ComplaintService {

   private apiUrl = 'http://localhost:3000/complaints';
constructor(private http: HttpClient) {}
   getComplaints(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  addComplaint(complaint: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, complaint);
  }

  updateComplaintStatus(id: number, status: string) {
  return this.http.put<any>(`${this.apiUrl}/${id}/status`, { status });
}
deleteComplaint(id: number) {
  return this.http.delete<any>(`${this.apiUrl}/${id}`);
}

}