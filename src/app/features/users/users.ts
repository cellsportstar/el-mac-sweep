import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SweepPlayer, PLAYERS } from '../../models/user';
import { Team } from '../../models/team';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './users.html',
  styleUrls: ['./users.scss']
})
export class UsersComponent {

  players: SweepPlayer[] = PLAYERS;

  /**
   * Checks if a user is currently "winning" 
   * (returns true if at least one team is still in)
   */
  isUserStillIn(player: SweepPlayer): boolean {
    return player.teams.some(team => team.isStillIn);
  }

  /**
   * Use this method to assign a team to a player
   */
  assignTeam(playerId: number, team: Team) {
    const player = this.players.find(p => p.id === playerId);
    if (player) {
      player.teams.push(team);
    }
  }

  ngOnInit() {
    this.players.forEach(player => {
      player.teams.forEach(team => {
        // Keep existing rotation
        (team as any).randomRotation = Math.random() * 2 - 1; 
        // Add random offsets between -10% and +10%
        (team as any).randomTop = 50 + (Math.random() * 20 - 10);
        (team as any).randomLeft = 50 + (Math.random() * 20 - 10);
      });
    });
  }
  /**
   * Use this to update a team's status from the API results
   */
  updateTeamStatus(teamId: string, isStillIn: boolean) {
    this.players.forEach(player => {
      const team = player.teams.find(t => t.id === teamId);
      if (team) {
        team.isStillIn = isStillIn;
      }
    });
  }
}