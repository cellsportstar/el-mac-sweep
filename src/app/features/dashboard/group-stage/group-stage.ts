import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PLAYERS, SweepPlayer } from '../../../models/user';

@Component({
  selector: 'app-group-stage',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './group-stage.html',
  styleUrl: './group-stage.scss',
})
export class GroupStage {
  // Receive the standings data from the parent Dashboard
  @Input() standings: any[] = [];

  getPlayerForTeam(tla: string): SweepPlayer | undefined {
    if (!tla) return undefined;
    return PLAYERS.find(p => p.teams.some(t => t.id.toUpperCase() === tla.toUpperCase()));
  }
}