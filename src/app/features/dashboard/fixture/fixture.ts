import { Component, Input, OnInit, OnDestroy, OnChanges, SimpleChanges, signal, computed, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PLAYERS, SweepPlayer } from '../../../models/user';

@Component({
  selector: 'app-fixture',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './fixture.html',
  styleUrl: './fixture.scss',
})
export class Fixture implements OnInit, OnDestroy, OnChanges {
  @Input() currentMatch: any;
  @Input() upcomingMatch: any;
  @Input() pastMatches: any[] = [];
  
  @Output() refreshData = new EventEmitter<void>();

  public now = signal(Date.now());
  
  // Ticking Match Clock Signals
  public liveMinute = signal<number | null>(null);
  public liveSecond = signal<number>(0);

  public formattedLiveTime = computed(() => {
    const m = this.liveMinute();
    if (m === null) return 'LIVE';
    
    const s = this.liveSecond();
    const sStr = s < 10 ? `0${s}` : `${s}`;
    
    // Check for Extra Time (Overtime periods)
    const isExtraTime = this.currentMatch?.status === 'EXTRA_TIME';
    const prefix = isExtraTime ? 'ET ' : '';
    
    let timeString = `${prefix}${m}:${sStr}`;

    // Append stoppage/injury time if the API provides it
    const addedTime = this.currentMatch?.injuryTime || this.currentMatch?.addedTime;
    if (addedTime) {
      timeString += ` +${addedTime}'`;
    }

    return timeString;
  });

  private countdownTimerId: any;
  private apiRefreshTimerId: any;
  private liveClockTimerId: any;

  ngOnInit() {
    this.countdownTimerId = setInterval(() => {
      this.now.set(Date.now());
    }, 1000);

    // Only refresh data from API if the match is currently live
    this.apiRefreshTimerId = setInterval(() => {
      if (this.isLive(this.currentMatch?.status)) {
        this.refreshData.emit();
      }
    }, 5 * 60 * 1000);

    // Clock ticks for BOTH regular time AND extra time
    this.liveClockTimerId = setInterval(() => {
      if (this.isTicking(this.currentMatch?.status) && this.liveMinute() !== null) {
        let currentSec = this.liveSecond() + 1;
        if (currentSec >= 60) {
          this.liveMinute.update(m => (m !== null ? m + 1 : null));
          this.liveSecond.set(0);
        } else {
          this.liveSecond.set(currentSec);
        }
      }
    }, 1000);
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['currentMatch'] && this.currentMatch) {
      if (this.currentMatch.minute) {
        // Update the minute if the API poll reflects a new minute
        if (this.liveMinute() !== this.currentMatch.minute) {
          this.liveMinute.set(this.currentMatch.minute);
          this.liveSecond.set(0); 
        }
      } else {
        this.liveMinute.set(null);
        this.liveSecond.set(0);
      }
    }
  }

  ngOnDestroy() {
    if (this.countdownTimerId) clearInterval(this.countdownTimerId);
    if (this.apiRefreshTimerId) clearInterval(this.apiRefreshTimerId);
    if (this.liveClockTimerId) clearInterval(this.liveClockTimerId);
  }

  // Helper: Is the match currently happening? (Includes halftime and penalties)
  isLive(status: string | undefined): boolean {
    return ['IN_PLAY', 'PAUSED', 'EXTRA_TIME', 'PENALTY_SHOOTOUT'].includes(status || '');
  }

  // Helper: Should the clock actually be ticking right now? (Excludes halftime/penalties)
  isTicking(status: string | undefined): boolean {
    return ['IN_PLAY', 'EXTRA_TIME'].includes(status || '');
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