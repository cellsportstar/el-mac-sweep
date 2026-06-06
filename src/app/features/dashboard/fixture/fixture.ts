import { Component, Input, OnInit, OnDestroy, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PLAYERS, SweepPlayer } from '../../../models/user';

@Component({
  selector: 'app-fixture',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './fixture.html',
  styleUrl: './fixture.scss',
})
export class Fixture implements OnInit, OnDestroy {
  // Receive data from the parent Dashboard
  @Input() currentMatch: any;
  @Input() pastMatches: any[] = [];

  // Local state for the countdown timer
  public now = signal(Date.now());
  private timerId: any;

  ngOnInit() {
    this.timerId = setInterval(() => {
      this.now.set(Date.now());
    }, 1000);
  }

  ngOnDestroy() {
    if (this.timerId) {
      clearInterval(this.timerId);
    }
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