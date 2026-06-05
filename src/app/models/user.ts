import { Team, TEAMS } from './team';

export interface SweepPlayer {
  id: number;
  name: string;
  images: {
    winAvatar: string;
    loseAvatar: string;
  }
  teams: Team[];
}

export const PLAYERS: SweepPlayer[]  = [
    { id: 1, name: 'Carl', images: { winAvatar: 'images/users/carl.png', loseAvatar: 'images/users/carl.png' },
      teams: [TEAMS.ENGLAND, TEAMS.URUGUAY, TEAMS.AUSTRIA, TEAMS.IVORY_COAST, TEAMS.JORDAN] },
    { id: 2, name: 'Jeanie', images: { winAvatar: 'images/users/jeanie.png', loseAvatar: 'images/users/jeanie.png' },
      teams: [TEAMS.PORTUGAL, TEAMS.CROATIA, TEAMS.IRAN, TEAMS.PANAMA, TEAMS.HAITI] },
    { id: 3, name: 'Jimmy', images: { winAvatar: 'images/users/jimmy.png', loseAvatar: 'images/users/jimmy.png' },
      teams: [TEAMS.BRAZIL, TEAMS.COLOMBIA, TEAMS.TURKIYE, TEAMS.DR_CONGO, TEAMS.BOSNIA_HERZEGOVINA] },
    { id: 4, name: 'Kerrie', images: { winAvatar: 'images/users/kerrie.png', loseAvatar: 'images/users/kerrie.png' },
      teams: [TEAMS.FRANCE, TEAMS.SENEGAL, TEAMS.ALGERIA, TEAMS.SWEDEN, TEAMS.QATAR] },
    { id: 5, name: 'Lilian', images: { winAvatar: 'images/users/lilian.png', loseAvatar: 'images/users/lilian.png' },
      teams: [TEAMS.BELGIUM, TEAMS.JAPAN, TEAMS.ECUADOR, TEAMS.SCOTLAND, TEAMS.CURACAO] },
    { id: 6, name: 'Peta', images: { winAvatar: 'images/users/peta.png', loseAvatar: 'images/users/peta.png' },
      teams: [TEAMS.MOROCCO, TEAMS.USA, TEAMS.AUSTRALIA, TEAMS.TUNISIA, TEAMS.GHANA] },
    { id: 7, name: 'Robbie', images: { winAvatar: 'images/users/robbie.png', loseAvatar: 'images/users/robbie.png' },
      teams: [TEAMS.NETHERLANDS, TEAMS.GERMANY, TEAMS.EGYPT, TEAMS.CZECH_REPUBLIC, TEAMS.IRAQ] },
    { id: 8, name: 'Toby', images: { winAvatar: 'images/users/toby.png', loseAvatar: 'images/users/toby.png' },
      teams: [TEAMS.ARGENTINA, TEAMS.MEXICO, TEAMS.SOUTH_AFRICA, TEAMS.PARAGUAY, TEAMS.SAUDI_ARABIA] },
    { id: 9, name: 'Willa', images: { winAvatar: 'images/users/willa.png', loseAvatar: 'images/users/willa.png' },
      teams: [TEAMS.SPAIN, TEAMS.SWITZERLAND, TEAMS.CANADA, TEAMS.NORWAY, TEAMS.NEW_ZEALAND] },
  ];