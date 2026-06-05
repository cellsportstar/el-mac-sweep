import { Component, OnInit } from '@angular/core';
import { FootballDataService } from '../../core/football-data.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss',
})
export class DashboardComponent implements OnInit {
  currentMatch: any;
  upcomingMatches: any[] = [];
  loading = true;

  constructor(private footballService: FootballDataService) {}

  ngOnInit() {
    this.footballService.getMatches().subscribe({
      next: (data) => {
        // Logic to separate matches
        this.currentMatch = data.matches.find((m: any) => m.status === 'IN_PLAY') || data.matches[0];
        this.upcomingMatches = data.matches.filter((m: any) => m.status === 'SCHEDULED').slice(0, 5);
        this.loading = false;
      },
      error: (err) => {
        console.error('Error fetching matches:', err);
        this.loading = false;
      }
    });
  }
}