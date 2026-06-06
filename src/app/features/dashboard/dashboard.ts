import { Component, OnInit, OnDestroy, signal } from '@angular/core';
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
export class DashboardComponent implements OnInit, OnDestroy {
  public now = signal(Date.now());
  private timerId: any;

  public loading = true;
  public errorMessage = '';
  
  public currentMatch: any; 
  public pastMatches: any[] = [];
  public standings: any[] = []; // Array to hold group stages

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

    this.timerId = setInterval(() => {
      this.now.set(Date.now());
    }, 1000);
  }

  ngOnDestroy() {
    if (this.timerId) {
      clearInterval(this.timerId);
    }
  }

  private processMatches(matches: any[]) {
    const now = new Date();
    this.currentMatch = matches.find((m: any) => new Date(m.utcDate) > now || m.status === 'IN_PLAY') 
                        || matches[matches.length - 1];

    this.pastMatches = matches.filter((m: any) => m.status === 'FINISHED').reverse();
  }

  getCountdown(utcDate: string | Date): string {
    if (!utcDate) return '';
    const matchTime = new Date(utcDate).getTime();
    const currentDistance = matchTime - this.now();

    if (currentDistance <= 0) return 'Match Started!';

    const seconds = Math.floor((currentDistance / 1000) % 60);
    const minutes = Math.floor((currentDistance / (1000 * 60)) % 60);
    const hours = Math.floor((currentDistance / (1000 * 60 * 60)) % 24);
    const days = Math.floor((currentDistance / (1000 * 60 * 60 * 24)) % 7);
    const weeks = Math.floor(currentDistance / (1000 * 60 * 60 * 24 * 7));

    const countdownParts: string[] = [];
    if (weeks > 0) countdownParts.push(`${weeks}w`);
    if (days > 0 || weeks > 0) countdownParts.push(`${days}d`);
    if (hours > 0 || days > 0 || weeks > 0) countdownParts.push(`${hours}h`);
    if (minutes > 0 || hours > 0 || days > 0) countdownParts.push(`${minutes}m`);
    countdownParts.push(`${seconds}s`);

    return countdownParts.join(' ');
  }

  getPlayerForTeam(tla: string): SweepPlayer | undefined {
    if (!tla) return undefined;
    return PLAYERS.find(p => p.teams.some(t => t.id.toUpperCase() === tla.toUpperCase()));
  }
}