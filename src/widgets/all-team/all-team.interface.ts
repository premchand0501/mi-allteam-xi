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
export interface AllTeamData {
  squadList: PlayerInfo[];
  filteredSquadList: PlayerInfo[];
  selectedSquad: PlayerInfo[];
  toggleSelectedSquadList: Boolean;
  allowedSelectionCount: number;
  filterText: string;
  searchText: string;
  selectionStep: number;
  captainId: string;
  viceCaptainId: string;
  focusedCaptainVCId: string;
  openSelection: boolean;
  deletedPlayers: number[];
  dragOverPlayerId: string;
  dragStartPlayer: string;
  allowedOverseasPlayers: number;
}
export interface AllTeamComputedProperties {
  getPlayersLeft: string;
  getForeignPlayersLeft: string;
  getFilteredSquadList: PlayerInfo[];
  mobileDevice: boolean;
}
export interface AllTeamMethods {
  fetchPlayers(): void;
  addRemoveInSquad(squadItem: PlayerInfo): void;
  selectCaptainVC(player: PlayerInfo, type: string): void;
  removePlayer(player: PlayerInfo): void;
  selectPlayer(player: PlayerInfo): void;
  handleDrop(index: number): void;
  handleDragOver(playerId: string): void;
  handleDragStart(playerId: string): void;
  handleDragEnter(playerId: string): void;
  shortenPlayerName(name: string): string;
}