import { Injectable, isDevMode } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class FootballDataService {
  // Swapped AllOrigins for Corsproxy.io which accepts custom headers
  private baseUrl = isDevMode() 
    ? '/api' 
    : 'https://corsproxy.io/?url=https://api.football-data.org';

  constructor(private http: HttpClient) {}

  getMatches() {
    const headers = new HttpHeaders({
      'X-Auth-Token': '55c2c0a0310244bd9060a761f6faefa8'
    });

    // This cleanly resolves to: https://corsproxy.io/?url=https://api.football-data.org/v4/competitions/WC/matches
    return this.http.get(`${this.baseUrl}/v4/competitions/WC/matches`, { headers });
  }
}