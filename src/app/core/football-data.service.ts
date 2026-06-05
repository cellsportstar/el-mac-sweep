import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class FootballDataService {
  // Use the prefix for your proxy
  private baseUrl = '/api/v4'; 

  constructor(private http: HttpClient) {}

  getMatches(): Observable<any> {
    const headers = new HttpHeaders({ 'X-Auth-Token': '55c2c0a0310244bd9060a761f6faefa8' });
    
    // Construct the path exactly once
    const url = `${this.baseUrl}/competitions/WC/matches`;
    
    return this.http.get(url, { headers });
  }
}