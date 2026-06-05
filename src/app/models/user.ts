import { Team } from './team';

export interface SweepPlayer {
  id: number;
  name: string;
  images: {
    winAvatar: string;
    loseAvatar: string;
  }
  teams: Team[];
}