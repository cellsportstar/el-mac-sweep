import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FootballDataService } from '../../core/football-data.service';

// Import your child components
import { Fixture } from './fixture/fixture'; 
// import { GroupStage } from './group-stage/group-stage'; 
import { KnockoutStage } from './knockout-stage/knockout-stage'; // Added import

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, Fixture, KnockoutStage], // Added KnockoutStage here
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss',
})
export class DashboardComponent implements OnInit {
  public loading = true;
  public errorMessage = '';
  
  public currentMatch: any; 
  public upcomingMatch: any; 
  public pastMatches: any[] = [];
  public standings: any[] = [];
  public knockoutMatches: any[] = []; // Added to hold the matches data for the knockout stage

  constructor(private footballService: FootballDataService) {}

  ngOnInit() {
    this.loadDashboardData();
  }

  public loadDashboardData() {
    this.footballService.getMatches().subscribe({
      next: (data: any) => {
        console.log("get matches: ", data);
        this.processMatches(data.matches);
        this.loading = false;
      },
      error: (err) => {
        this.errorMessage = 'Failed to load match data.';
        this.loading = false;
      }
    });

    this.footballService.getStandings().subscribe({
      next: (data: any) => {
        console.log("get standing: ", data);
        this.standings = data.standings.filter((s: any) => s.type === 'TOTAL');
      },
      error: (err) => {
        console.error('Failed to load standings', err);
      }
    });
  }

  public handleRefresh() {
    console.log('Refreshing match data...');
    this.loadDashboardData();
  }

  private processMatches(matches: any[]) {
    const now = new Date();
    
    // Save all matches for the knockout stage component to filter internally
    this.knockoutMatches = matches;

    // Logic to separate live matches
    this.currentMatch = matches.find((m: any) =>  
      m.status === 'IN_PLAY' || m.status === 'PAUSED' || m.status === 'EXTRA_TIME' || m.status === 'PENALTY_SHOOTOUT'
    );
    
    // If no live match, pick the next upcoming one
    if (!this.currentMatch) {
      this.upcomingMatch = matches.find((m: any) => new Date(m.utcDate) > now);
    } else {
      this.upcomingMatch = null;
    }

    this.pastMatches = matches.filter((m: any) => m.status === 'FINISHED').reverse();
  }
}