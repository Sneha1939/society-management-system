import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AssignmentService {

  private apiUrl = 'http://localhost:3000/assignments';

  constructor(private http: HttpClient) {}

  assignWorker(
    serviceRequestId: number,
    workerId: number
  ): Observable<any> {

    return this.http.post(
      this.apiUrl,
      {
        service_request_id: serviceRequestId,
        worker_id: workerId
      }
    );
  }
}