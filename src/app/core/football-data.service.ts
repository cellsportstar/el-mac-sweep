import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class FootballDataService {
  private apiUrl = 'https://api.football-data.org/v4';
  private apiKey = '55c2c0a0310244bd9060a761f6faefa8'; // Replace with your actual key

  constructor(private http: HttpClient) {}

  getMatches(): Observable<any> {
    const headers = new HttpHeaders({ 'X-Auth-Token': this.apiKey });
    // Fetches matches for the World Cup (WC)
    return this.http.get(`${this.apiUrl}/competitions/WC/matches`, { headers });
  }
}