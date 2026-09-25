import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ServiceRequestService {

  private apiUrl = 'http://localhost:3000/service-requests';

  constructor(private http: HttpClient) {}

  getRequests(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  createRequest(request: any): Observable<any> {
    return this.http.post(this.apiUrl, request);
  }

  getMatchingWorkers(
    serviceCategoryId: number
  ): Observable<any[]> {

    return this.http.get<any[]>(
      `http://localhost:3000/workers/matching/${serviceCategoryId}`
    );
  }
}