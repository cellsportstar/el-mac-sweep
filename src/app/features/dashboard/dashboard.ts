import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FootballDataService } from '../../core/football-data.service';

// Import your new child components
import { Fixture } from './fixture/fixture'; // Update with your actual path
import { GroupStage } from './group-stage/group-stage'; // Update with your actual path

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, Fixture, GroupStage], // Add child components here
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss',
})
export class DashboardComponent implements OnInit {
  public loading = true;
  public errorMessage = '';
  
  public currentMatch: any; 
  public pastMatches: any[] = [];
  public standings: any[] = [];

  constructor(private footballService: FootballDataService) {}

  ngOnInit() {
    // Fetch Matches
    this.footballService.getMatches().subscribe({
      next: (data: any) => {
        this.processMatches(data.matches);
        this.loading = false;
      },
      error: (err) => {
        this.errorMessage = 'Failed to load match data.';
        this.loading = false;
      }
    });

    // Fetch Standings
    this.footballService.getStandings().subscribe({
      next: (data: any) => {
        // We only want the 'TOTAL' standings, not HOME/AWAY splits
        this.standings = data.standings.filter((s: any) => s.type === 'TOTAL');
      },
      error: (err) => {
        console.error('Failed to load standings', err);
      }
    });
  }

  private processMatches(matches: any[]) {
    const now = new Date();
    this.currentMatch = matches.find((m: any) => new Date(m.utcDate) > now || m.status === 'IN_PLAY') 
                        || matches[matches.length - 1];

    this.pastMatches = matches.filter((m: any) => m.status === 'FINISHED').reverse();
  }
}