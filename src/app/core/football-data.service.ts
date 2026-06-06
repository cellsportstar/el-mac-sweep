import { Injectable, isDevMode } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class FootballDataService {
  // Uses your local setup during development, and the CORS proxy in production
  private baseUrl = isDevMode() 
    ? '/api' 
    : 'https://api.allorigins.win/raw?url=https://api.football-data.org';

  constructor(private http: HttpClient) {}

  getMatches() {
    const headers = new HttpHeaders({
      'X-Auth-Token': '55c2c0a0310244bd9060a761f6faefa8'
    });

    // If in production, AllOrigins requires fetching the exact target URL structure
    const url = isDevMode()
      ? `${this.baseUrl}/v4/competitions/WC/matches`
      : `${this.baseUrl}/v4/competitions/WC/matches`; 

    return this.http.get(url, { headers });
  }
}