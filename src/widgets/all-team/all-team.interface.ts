export interface SportSpecificKeys {
  is_wicket_keeper: string;
  is_probable: string;
  is_selected: string;
  is_captain: string;
  bowling_style: string;
  batting_style: string;
  is_marquee: string;
}
export interface PlayerInfo {
  id: string;
  name: string;
  short_name: string;
  jersey_number: string;
  skill_id: string;
  skill_name: string;
  nationality_id: string;
  nationality: string;
  sport_specific_keys: SportSpecificKeys;
  season_year: string;
}
export interface DeletedPlayer {
  index: number;
  playerId: string;
}
export interface AllTeamData {
  squadList: PlayerData[];
  filteredSquadList: PlayerData[];
  selectedSquad: (PlayerData | null)[];
  toggleSelectedSquadList: Boolean;
  allowedSelectionCount: number;
  season: string;
  searchText: string;
  selectionStep: number;
  captainId: string;
  wicketKeeperId: string;
  focusedCaptainWKId: string;
  openSelection: boolean;
  deletedPlayers: DeletedPlayer[];
  dragOverPlayerId: string;
  dragStartPlayerId: string;
  allowedOverseasPlayers: number;
  endPoints: any;
  loadingStatus: number;
}
export interface AllTeamComputedProperties {
  getPlayersLeft: string;
  getForeignPlayersLeft: string;
  getFilteredSquadList: PlayerData[];
  mobileDevice: boolean;
}
export interface AllTeamMethods {
  fetchPlayers(season: string): void;
  addRemoveInSquad(squadItem: PlayerData): void;
  selectCaptainWK(player: PlayerData, type: string): void;
  removePlayer(player: PlayerData, index: number): void;
  selectPlayer(player: PlayerData): void;
  handleDrop(index: number): void;
  handleDragOver(playerId: string): void;
  handleDragStart(playerId: string): void;
  handleDragEnter(playerId: string): void;
  shortenPlayerName(name: string): string;
  clearSearch(e: Event): void;
}

export interface BattingStats {
  matches_played: number | null;
  innings: number | null;
  not_outs: number | null;
  runs: number | null;
  balls: number | null;
  strike_rate: number | null;
  average: number | null;
  fifties: number | null;
  hundred: number | null;
  boundary_frequency: number | null;
  boundary_percentage: number | null;
  dot_ball_frequency: number | null;
  dot_ball_percentage: number | null;
  highest_score: number | null;
  highest_score_notout: string | null;
}

export interface BowlingStats {
  matches_played: number | null;
  innings: number | null;
  overs: number | null;
  runs_conceded: number | null;
  maidens: number | null;
  wickets: number | null;
  average: number | null;
  economy: number | null;
  strike_rate: number | null;
  boundary_frequency: number | null;
  boundary_percentage: number | null;
  dot_ball_frequency: number | null;
  dot_ball_percentage: number | null;
  five_wickets_haul: number | null;
  four_wickets_haul: number | null;
  best: string | null;
}

export interface OverAllStats {
  batting: BattingStats;
  bowling: BowlingStats;
}
export interface PlayerDetails {
  id: string;
  name: string;
  name_english: string;
  skill_id: string;
  skill: string;
  nationality_id: string;
  nationality: string;
  national_team_id: string;
  national_team: string;
  is_wicket_keeper: boolean;
  is_captain: boolean;
  is_vice_captain: boolean;
}
export interface PlayerData {
  player_details: PlayerDetails;
  over_all_stats: OverAllStats;
}