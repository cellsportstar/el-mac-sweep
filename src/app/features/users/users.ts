import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SweepPlayer } from '../../models/user';
import { Team, TEAMS } from '../../models/team';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './users.html',
  styleUrls: ['./users.scss']
})
export class UsersComponent {

  players: SweepPlayer[] = [
    { id: 1, name: 'Carl', images: { winAvatar: 'assets/carl/win.png', loseAvatar: 'assets/carl/lose.png' }, 
      teams: [TEAMS.BRAZIL, TEAMS.ALGERIA] },
    { id: 2, name: 'Jeanie', images: { winAvatar: 'assets/jeanie/win.png', loseAvatar: 'assets/jeanie/lose.png' }, 
      teams: [TEAMS.FRANCE, TEAMS.AUSTRALIA] },
    { id: 3, name: 'Jimmy', images: { winAvatar: 'assets/jimmy/win.png', loseAvatar: 'assets/jimmy/lose.png' }, 
      teams: [TEAMS.ARGENTINA, TEAMS.BELGIUM] },
    { id: 4, name: 'Kerrie', images: { winAvatar: 'assets/kerrie/win.png', loseAvatar: 'assets/kerrie/lose.png' }, 
      teams: [TEAMS.ENGLAND, TEAMS.AUSTRIA] },
    { id: 5, name: 'Lilian', images: { winAvatar: 'assets/lilian/win.png', loseAvatar: 'assets/lilian/lose.png' }, 
      teams: [TEAMS.GERMANY, TEAMS.BOSNIA_HERZEGOVINA] },
    { id: 6, name: 'Peta', images: { winAvatar: 'assets/peta/win.png', loseAvatar: 'assets/peta/lose.png' }, 
      teams: [TEAMS.PORTUGAL, TEAMS.CANADA] },
    { id: 7, name: 'Robbie', images: { winAvatar: 'assets/robbie/win.png', loseAvatar: 'assets/robbie/lose.png' }, 
      teams: [TEAMS.SPAIN, TEAMS.CAPE_VERDE] },
    { id: 8, name: 'Toby', images: { winAvatar: 'assets/toby/win.png', loseAvatar: 'assets/toby/lose.png' }, 
      teams: [TEAMS.NETHERLANDS, TEAMS.COLOMBIA] },
    { id: 9, name: 'Willa', images: { winAvatar: 'assets/willa/win.png', loseAvatar: 'assets/willa/lose.png' }, 
      teams: [TEAMS.JAPAN, TEAMS.CROATIA] }
  ];

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