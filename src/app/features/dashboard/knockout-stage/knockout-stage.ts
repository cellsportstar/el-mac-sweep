import { Component, Input, computed, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PLAYERS, SweepPlayer } from '../../../models/user';

@Component({
  selector: 'app-knockout-stage',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './knockout-stage.html',
  styleUrl: './knockout-stage.scss',
})
export class KnockoutStage {
  // Pass the array of knockout matches from the parent
  @Input() set matches(value: any[]) {
    this._matches.set(value || []);
  }

  private _matches = signal<any[]>([]);

  // Robust computed property that dynamically finds and sorts stages present in the data
  public groupedStages = computed(() => {
    const allMatches = this._matches();
    const groups: Record<string, any[]> = {};
    
    // Define the official order for sorting the stages dynamically
    const stageOrder = ['LAST_32',,'LAST_16', 'QUARTER_FINALS', 'SEMI_FINALS', 'THIRD_PLACE', 'FINAL'];

    for (const match of allMatches) {
      const stage = match.stage;
      
      // Ignore if there is no stage or if it's a group stage match
      if (!stage || !stageOrder.includes(stage)) continue;
      
      if (!groups[stage]) groups[stage] = [];
      groups[stage].push(match);
    }

    // Return the found groups sorted by the predefined order
    return Object.keys(groups)
      .sort((a, b) => stageOrder.indexOf(a) - stageOrder.indexOf(b))
      .map(stageKey => ({
        key: stageKey,
        name: this.formatStageName(stageKey),
        matches: groups[stageKey]
      }));
  });

  getPlayerForTeam(tla: string | null | undefined): SweepPlayer | undefined {
    if (!tla) return undefined;
    return PLAYERS.find(p => p.teams.some(t => t.id.toUpperCase() === tla.toUpperCase()));
  }

  private formatStageName(stage: string): string {
    const map: Record<string, string> = {
      'LAST_16': 'Round of 16',
      'QUARTER_FINALS': 'Quarter-finals',
      'SEMI_FINALS': 'Semi-finals',
      'THIRD_PLACE': 'Third Place Play-off',
      'FINAL': 'Final'
    };
    return map[stage] || stage.replace(/_/g, ' ');
  }
}