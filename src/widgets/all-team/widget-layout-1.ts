import { Controller } from "stimulus";
import { ApplicationObj } from '../../main';
import { AllTeamData, AllTeamMethods, AllTeamComputedProperties, PlayerData } from './all-team.interface';
import Vue from 'vue'

import { polyfill } from "mobile-drag-drop";
import { endPoints } from './PlayersEndPoint';

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
        season: '2019',
        searchText: '',
        selectionStep: 0,
        captainId: '',
        wicketKeeperId: '',
        focusedCaptainWKId: '',
        openSelection: false,
        deletedPlayers: [],
        dragOverPlayerId: '',
        dragStartPlayerId: '',
        allowedOverseasPlayers: 4,
        endPoints,
        loadingStatus: 0
      },
      computed: {
        getPlayersLeft() {
          const validPlayers = this.selectedSquad.filter(p => p && p.player_details.hasOwnProperty('id'));
          return (this.allowedSelectionCount - validPlayers.length) + '/' + this.allowedSelectionCount;
        },
        getForeignPlayersLeft() {
          const overseas = this.selectedSquad.filter(player => player && player.player_details.nationality.toLowerCase() !== 'india')
          return (this.allowedOverseasPlayers - overseas.length) + '/' + this.allowedOverseasPlayers;
        },
        getFilteredSquadList() {
          if (this.searchText) {
            return this.squadList.filter((s: PlayerData) => s.player_details.name.toLowerCase().includes(this.searchText.toLowerCase()));
          }
          return this.squadList;
        },
        mobileDevice() {
          return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
        },
      },
      methods: {
        clearSearch(e: Event) {
          this.searchText = '';
          console.log(e.target);
          const btnEl: HTMLButtonElement = e.target as HTMLButtonElement;
          const parent = btnEl.parentElement;
          if (parent) {
            const parentParent = parent.parentElement;
            if (parentParent) {
              const input = parentParent.querySelector('input');
              input && input.focus();
            }
          }
        },
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
        selectPlayer(player: PlayerData) {
          const { index, playerId } = this.deletedPlayers[0];
          console.log(player);
          const overseas = this.selectedSquad.filter(player => player && player.player_details.nationality.toLowerCase() !== 'india');
          if (overseas.length === this.allowedOverseasPlayers && player.player_details.nationality.toLowerCase() !== 'india') {
            alert('Only 4 overseas players allowed');
            return;
          }
          const squad = this.selectedSquad.map((p, ind) => {
            if (ind === index) {
              p = player;
              playerId && (p.player_details.id = playerId);
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
        removePlayer(player: PlayerData, index: number) {
          this.deletedPlayers.push({ index, playerId: player.player_details.id });
          const squadList = this.selectedSquad
          squadList[index] = null;
          this.selectedSquad = squadList;
          this.$forceUpdate();
        },
        selectCaptainWK(player: PlayerData, type: string) {
          if (type === 'c') {
            if (this.captainId === this.focusedCaptainWKId) {
              this.captainId = ''
            }
            else {
              if (player.player_details.id === this.wicketKeeperId) {
                this.wicketKeeperId = ''
              }
              this.captainId = player.player_details.id
            }
          }
          else if (type === 'wk') {
            if (this.wicketKeeperId === this.focusedCaptainWKId) {
              this.wicketKeeperId = ''
            }
            else {
              if (player.player_details.id === this.captainId) {
                this.captainId = ''
              }
              this.wicketKeeperId = player.player_details.id
            }
          }
        },
        addRemoveInSquad(player: PlayerData) {
          if (!this.selectedSquad.length) {
            if (player.player_details.nationality.toLowerCase() === 'india') {
              this.selectedSquad.push(player);
            }
            else {
              const overseas = this.selectedSquad.filter(player => player && player.player_details.nationality.toLowerCase() !== 'india');

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
            if (player.player_details.nationality.toLowerCase() === 'india') {
              this.selectedSquad.push(player);
            }
            else {
              const overseas = this.selectedSquad.filter(player => player && player.player_details.nationality.toLowerCase() !== 'india');

              if (overseas.length < this.allowedOverseasPlayers)
                this.selectedSquad.push(player);
              else
                alert('Only 4 overseas players allowed');
            }
          }
        },
        async fetchPlayers(season: string) {
          this.loadingStatus = 1;
          try {
            const res: any = (await (await fetch(this.endPoints[season])).json());
            console.log(res);
            if (Object.keys(res).length && res.players) {
              this.squadList = res.players;
              this.squadList = this.squadList.sort((p1, p2) => {
                const a = p1.player_details.name.toUpperCase();
                const b = p2.player_details.name.toUpperCase();
                if (a > b) {
                  return 1
                }
                if (a < b) {
                  return -1
                }
                return 0
              });
              // for (let i = 0; i < this.allowedSelectionCount; i++) {
              //   this.selectedSquad[i] = null;
              //   this.deletedPlayers[i] = { index: i, playerId: '' }
              // }
              this.loadingStatus = 0;
            }
          }
          catch (e) {
            console.log(e);
            this.loadingStatus = 2;
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
            if (player && this.dragStartPlayerId === player.player_details.id) {
              droppingPlayerId = index;
              return player;
            }
          });
          squad[index] = droppingPlayer[0];
          squad[droppingPlayerId] = droppedOnPlayer;
          console.log(this.dragOverPlayerId, this.dragStartPlayerId, droppedOnPlayer, droppingPlayer);
          this.selectedSquad = squad;
          this.dragOverPlayerId = '';
          // this.dragStartPlayerId = '';
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
          this.dragStartPlayerId = playerId;
        },
        handleDragEnter(playerId: string) {
          if (this.selectionStep !== 1) {
            return true;
          }
          if (this.mobileDevice)
            this.dragStartPlayerId = playerId;
        },
      },
      mounted() {
        this.fetchPlayers(this.season);
        console.log(this.endPoints);
      }
    })
  }
}
export default () => ApplicationObj.register('all-team--widget-layout-1', AllTeamXI)