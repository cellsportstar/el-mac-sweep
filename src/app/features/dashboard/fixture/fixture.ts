import {
  Component,
  Input,
  OnInit,
  OnDestroy,
  OnChanges,
  SimpleChanges,
  signal,
  computed,
  Output,
  EventEmitter
} from '@angular/core';
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

  /**
   * Live match state
   */
  private lastApiUpdateTime = signal<number>(0);
  private apiMinute = signal<number | null>(null);

  /**
   * Prevent refresh spam while waiting
   * for a response from parent/API.
   */
  private refreshRequested = false;

  /**
   * Displayed live clock
   */
  public formattedLiveTime = computed(() => {
    const minute = this.apiMinute();

    if (minute === null) {
      return 'LIVE';
    }

    const shouldTick = this.isTicking(
      this.currentMatch?.status
    );

    const elapsedSeconds = shouldTick
      ? Math.floor(
          (this.now() - this.lastApiUpdateTime()) / 1000
        )
      : 0;

    const displayMinute =
      minute + Math.floor(elapsedSeconds / 60);

    const displaySecond =
      elapsedSeconds % 60;

    const secondText =
      displaySecond < 10
        ? `0${displaySecond}`
        : `${displaySecond}`;

    const isExtraTime =
      this.currentMatch?.status === 'EXTRA_TIME';

    const prefix = isExtraTime
      ? 'ET '
      : '';

    let text =
      `${prefix}${displayMinute}:${secondText}`;

    const addedTime =
      this.currentMatch?.injuryTime ??
      this.currentMatch?.addedTime;

    if (addedTime) {
      text += ` +${addedTime}'`;
    }

    return text;
  });

  /**
   * Indicates if data is stale.
   * Reactive because it depends on now().
   */
  public isDataStale = computed(() => {
    if (!this.isLive(this.currentMatch?.status)) {
      return false;
    }

    return (
      this.now() - this.lastApiUpdateTime() >
      5 * 60 * 1000
    );
  });

  private clockTimerId?: ReturnType<typeof setInterval>;
  private staleCheckTimerId?: ReturnType<typeof setInterval>;

  ngOnInit(): void {
    /**
     * Master clock
     */
    this.clockTimerId = setInterval(() => {
      this.now.set(Date.now());
    }, 1000);

    /**
     * Check every 30s if live data
     * has become stale.
     */
    this.staleCheckTimerId = setInterval(() => {
      this.checkForStaleData();
    }, 30000);
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (
      changes['currentMatch'] &&
      this.currentMatch
    ) {
      /**
       * Fresh data received.
       */
      this.refreshRequested = false;

      this.lastApiUpdateTime.set(Date.now());

      if (
        this.currentMatch.minute !== undefined &&
        this.currentMatch.minute !== null
      ) {
        this.apiMinute.set(
          Number(this.currentMatch.minute)
        );
      } else {
        this.apiMinute.set(null);
      }
    }
  }

  ngOnDestroy(): void {
    if (this.clockTimerId) {
      clearInterval(this.clockTimerId);
    }

    if (this.staleCheckTimerId) {
      clearInterval(this.staleCheckTimerId);
    }
  }

  /**
   * Trigger a refresh once if
   * live data is older than 5 minutes.
   */
  private checkForStaleData(): void {
    if (!this.isLive(this.currentMatch?.status)) {
      return;
    }

    const age =
      Date.now() - this.lastApiUpdateTime();

    const FIVE_MINUTES =
      5 * 60 * 1000;

    if (
      age >= FIVE_MINUTES &&
      !this.refreshRequested
    ) {
      this.refreshRequested = true;
      this.refreshData.emit();
    }
  }

  isLive(status: string | undefined): boolean {
    return [
      'IN_PLAY',
      'PAUSED',
      'EXTRA_TIME',
      'PENALTY_SHOOTOUT'
    ].includes(status || '');
  }

  isTicking(status: string | undefined): boolean {
    return [
      'IN_PLAY',
      'EXTRA_TIME'
    ].includes(status || '');
  }

  getCountdown(
    utcDate: string | Date
  ): string {
    if (!utcDate) {
      return '';
    }

    const matchTime =
      new Date(utcDate).getTime();

    const currentDistance =
      matchTime - this.now();

    if (currentDistance <= 0) {
      return 'Match Started!';
    }

    const seconds = Math.floor(
      (currentDistance / 1000) % 60
    );

    const minutes = Math.floor(
      (currentDistance / (1000 * 60)) % 60
    );

    const hours = Math.floor(
      (currentDistance / (1000 * 60 * 60)) % 24
    );

    const days = Math.floor(
      (currentDistance / (1000 * 60 * 60 * 24)) % 7
    );

    const weeks = Math.floor(
      currentDistance /
      (1000 * 60 * 60 * 24 * 7)
    );

    const countdownParts: string[] = [];

    if (weeks > 0) {
      countdownParts.push(`${weeks}w`);
    }

    if (days > 0 || weeks > 0) {
      countdownParts.push(`${days}d`);
    }

    if (hours > 0 || days > 0 || weeks > 0) {
      countdownParts.push(`${hours}h`);
    }

    if (minutes > 0 || hours > 0 || days > 0) {
      countdownParts.push(`${minutes}m`);
    }

    countdownParts.push(`${seconds}s`);

    return countdownParts.join(' ');
  }

  getPlayerForTeam(
    tla: string
  ): SweepPlayer | undefined {
    if (!tla) {
      return undefined;
    }

    return PLAYERS.find(player =>
      player.teams.some(
        team =>
          team.id.toUpperCase() ===
          tla.toUpperCase()
      )
    );
  }
}