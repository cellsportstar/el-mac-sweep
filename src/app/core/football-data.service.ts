import { Injectable, isDevMode } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class FootballDataService {
  // 1. Automatically toggle between your local proxy and the absolute API URL
  private baseUrl = isDevMode() 
    ? '/api' 
    : 'https://api.football-data.org';

  constructor(private http: HttpClient) {}

  getMatches() {
    const headers = new HttpHeaders({
      'X-Auth-Token': 'YOUR_API_KEY_HERE' // Ensure your token is attached
    });

    return this.http.get(`${this.baseUrl}/v4/competitions/WC/matches`, { headers });
  }
}