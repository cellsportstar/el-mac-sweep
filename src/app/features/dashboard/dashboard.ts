import { Component, OnInit } from '@angular/core';
import { FootballDataService } from '../../core/football-data.service';
import { CommonModule } from '@angular/common';
import { PLAYERS, SweepPlayer } from '../../models/user';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss',
})
export class DashboardComponent implements OnInit {
  currentMatch: any = null;
  upcomingMatches: any[] = [];
  pastMatches: any[] = [];
  loading = true;
  errorMessage: string | null = null;

  constructor(private footballService: FootballDataService) {}

  ngOnInit() {
    this.footballService.getMatches().subscribe({
      next: (data: any) => {
        const matches = data?.matches || [];
        
        if (matches.length > 0) {
          this.currentMatch = matches.find((m: any) => m.status === 'IN_PLAY') || matches.find((m: any) => m.status === 'TIMED') || matches[0];
          this.upcomingMatches = matches.filter((m: any) => m.status === 'SCHEDULED' || m.status === 'TIMED').slice(0, 5);
          this.pastMatches = matches.filter((m: any) => m.status === 'FINISHED').slice(-5).reverse();
        }
        this.loading = false;
      },
      error: (err) => {
        this.errorMessage = "Failed to load match data.";
        this.loading = false;
      }
    });
  }

  /**
   * Finds the sweepstakes player assigned to a team using its TLA code.
   * Compares uppercase versions to prevent casing discrepancies.
   */
  getPlayerForTeam(tla: string): SweepPlayer | undefined {
    if (!tla) return undefined;
    return PLAYERS.find(p => p.teams.some(t => t.id.toUpperCase() === tla.toUpperCase()));
  }
  
  getCountdown(utcDate: string): string {
    const diff = new Date(utcDate).getTime() - new Date().getTime();
    if (diff < 0) return 'In Progress';
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const mins = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    return `${hours}h ${mins}m to start`;
  }
}