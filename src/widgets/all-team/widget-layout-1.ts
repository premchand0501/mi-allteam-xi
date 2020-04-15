import { Controller } from "stimulus";
import { ApplicationObj } from '../../main';
import { PlayerInfo, AllTeamData, AllTeamMethods, AllTeamComputedProperties } from './all-team.interface';
import Vue from 'vue'

import { polyfill } from "mobile-drag-drop";

polyfill();

class AllTeamXI extends Controller {
  connect() {
    console.log('all team xi connected');

    this.initVueComponent();
  }
  initVueComponent() {
    new Vue<AllTeamData, AllTeamMethods, AllTeamComputedProperties>({
      el: '#allTeam',
      data: {
        squadList: [],
        filteredSquadList: [],
        selectedSquad: [],
        toggleSelectedSquadList: false,
        allowedSelectionCount: 11,
        filterText: '',
        searchText: '',
        selectionStep: 1,
        captainId: '',
        viceCaptainId: '',
        focusedCaptainVCId: '',
        openSelection: false,
        deletedPlayers: [],
        dragOverPlayerId: '',
        dragStartPlayer: '',
        allowedOverseasPlayers: 4,
      },
      computed: {
        getPlayersLeft() {
          const validPlayers = this.selectedSquad.filter(p => p.hasOwnProperty('id'));
          return (this.allowedSelectionCount - validPlayers.length) + '/' + this.allowedSelectionCount;
        },
        getForeignPlayersLeft() {
          const overseas = this.selectedSquad.filter(player => player.nationality.toLowerCase() !== 'india')
          return (this.allowedOverseasPlayers - overseas.length) + '/' + this.allowedOverseasPlayers;
        },
        getFilteredSquadList() {
          if (this.filterText) {
            const filtered = this.squadList.filter((s: PlayerInfo) => s.season_year === this.filterText);
            if (this.searchText) {
              return filtered.filter((s: PlayerInfo) => s.name.toLowerCase().includes(this.searchText.toLowerCase()) && s.season_year === this.filterText);
            }
            else {
              return filtered;
            }
          }
          else if (this.searchText) {
            return this.squadList.filter((s: PlayerInfo) => s.name.toLowerCase().includes(this.searchText.toLowerCase()));
          }
          return this.squadList;
        },
        mobileDevice() {
          return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
        },
      },
      methods: {
        shortenPlayerName(name): string {
          const wordArr = name.split(' ');
          if (wordArr.length === 1) {
            return name;
          }
          else if (wordArr.length > 1) {
            const firstWord = wordArr[0];
            const firstLetter = firstWord.slice(0, 1) + '. ';
            const remaining = wordArr.filter((_, i) => i > 0);
            const remainingName = remaining.join(' ');
            return firstLetter + remainingName;
          }
          return ''
        },
        selectPlayer(player: PlayerInfo) {
          const { index, playerId } = this.deletedPlayers[0];
          console.log(player);
          const overseas = this.selectedSquad.filter(player => player.nationality.toLowerCase() !== 'india');
          if (overseas.length === this.allowedOverseasPlayers && player.nationality.toLowerCase() !== 'india') {
            alert('Only 4 overseas players allowed');
            return;
          }
          const squad = this.selectedSquad.map((p, ind) => {
            if (ind === index) {
              p = player;
              p.id = playerId;
              this.deletedPlayers.shift();
            }
            return p;
          });
          if (this.deletedPlayers.length === 0) {
            this.openSelection = false;
          }
          this.selectedSquad = squad;
          console.log(this.selectedSquad.length);
        },
        removePlayer(player: PlayerInfo) {
          const squadList = this.selectedSquad.map((p: PlayerInfo, index: number) => {
            if (p.id === player.id) {
              this.deletedPlayers.push({ index, playerId: p.id });
              delete p.id;
            }
            return p;
          });
          this.selectedSquad = squadList;
        },
        selectCaptainVC(player: PlayerInfo, type: string) {
          if (type === 'c') {
            if (this.captainId === this.focusedCaptainVCId) {
              this.captainId = ''
            }
            else {
              if (player.id === this.viceCaptainId) {
                this.viceCaptainId = ''
              }
              this.captainId = player.id
            }
          }
          else if (type === 'vc') {
            if (this.viceCaptainId === this.focusedCaptainVCId) {
              this.viceCaptainId = ''
            }
            else {
              if (player.id === this.captainId) {
                this.captainId = ''
              }
              this.viceCaptainId = player.id
            }
          }
        },
        addRemoveInSquad(player: PlayerInfo) {
          if (!this.selectedSquad.length) {
            if (player.nationality.toLowerCase() === 'india') {
              this.selectedSquad.push(player);
            }
            else {
              const overseas = this.selectedSquad.filter(player => player.nationality.toLowerCase() !== 'india');

              if (overseas.length < this.allowedOverseasPlayers)
                this.selectedSquad.push(player);
              else
                alert('Only 4 overseas players allowed');
            }
            return;
          }
          const foundIndex: number = this.selectedSquad.indexOf(player);
          if (foundIndex > -1) {
            this.selectedSquad.splice(foundIndex, 1);
          }
          else {
            if (this.selectedSquad.length === this.allowedSelectionCount) {
              alert('11 players are selected already, please remove any player to add another.');
              return;
            }
            if (player.nationality.toLowerCase() === 'india') {
              this.selectedSquad.push(player);
            }
            else {
              const overseas = this.selectedSquad.filter(player => player.nationality.toLowerCase() !== 'india');

              if (overseas.length < this.allowedOverseasPlayers)
                this.selectedSquad.push(player);
              else
                alert('Only 4 overseas players allowed');
            }
          }
        },
        async fetchPlayers() {
          const res: PlayerInfo[] = (await (await fetch('./squad.json')).json()) as PlayerInfo[];
          console.log(res);
          if (res.length) {
            this.squadList = res;
            this.selectedSquad = this.squadList.slice(0, 11);
          }
        },
        handleDrop(index: number) {
          if (this.selectionStep !== 1) {
            return true;
          }
          const squad = this.selectedSquad;
          const droppedOnPlayer = squad[index];
          let droppingPlayerId = -1;
          const droppingPlayer = squad.filter((player, index) => {
            if (this.dragStartPlayer === player.id) {
              droppingPlayerId = index;
              return player;
            }
          });
          squad[index] = droppingPlayer[0];
          squad[droppingPlayerId] = droppedOnPlayer;
          this.selectedSquad = squad;
          this.dragOverPlayerId = '';
        },
        handleDragOver(playerId: string) {
          if (this.selectionStep !== 1) {
            return true;
          }
          this.dragOverPlayerId = playerId;
        },
        handleDragStart(playerId: string) {
          if (this.selectionStep !== 1) {
            return true;
          }
          this.dragStartPlayer = playerId;
        },
        handleDragEnter(playerId: string) {
          if (this.selectionStep !== 1) {
            return true;
          }
          if (this.mobileDevice)
            this.dragStartPlayer = playerId;
        },
      },
      mounted() {
        this.fetchPlayers();
      }
    })
  }
}
export default () => ApplicationObj.register('all-team--widget-layout-1', AllTeamXI)