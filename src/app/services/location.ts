import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class LocationService {
  private stateUrl = 'assets/state-data/state.json';
  private districtUrl = 'assets/state-data/State';
  constructor(private http: HttpClient) {}
  getStates():Observable<any>{
    return this.http.get<any>(this.stateUrl);
  }
  getDistricts(stateLgCode:number): Observable<any>{
    return this.http.get<any>(`${this.districtUrl}/${stateLgCode}.json`);
  }
}
