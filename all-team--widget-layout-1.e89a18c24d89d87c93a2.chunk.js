(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{10:function(e,t,a){"use strict";a.r(t);var s=a(0),l=a(1),i=a(5),n=a(7),r=a(6),o={2008:"./1111_all_players_1075.json",2009:"./1111_all_players_1137.json",2010:"./1111_all_players_1184.json",2011:"./1111_all_players_1295.json",2012:"./1111_all_players_1380.json",2013:"./1111_all_players_1517.json",2014:"./1111_all_players_2173.json",2015:"./1111_all_players_2340.json",2016:"./1111_all_players_2569.json",2017:"./1111_all_players_2756.json",2018:"./1111_all_players_2940.json",2019:"./1111_all_players_3130.json"};Object(r.polyfill)();var d=function(e){function t(){return null!==e&&e.apply(this,arguments)||this}return s.b(t,e),t.prototype.connect=function(){console.log("all team xi connected"),this.initVueComponent()},t.prototype.initVueComponent=function(){new n.a({el:"#allTeam",data:{squadList:[],filteredSquadList:[],selectedSquad:[],toggleSelectedSquadList:!1,allowedSelectionCount:11,season:"2019",searchText:"",selectionStep:0,captainId:"",wicketKeeperId:"",focusedCaptainWKId:"",openSelection:!1,deletedPlayers:[],dragOverPlayerId:"",dragStartPlayerId:"",allowedOverseasPlayers:4,endPoints:o,loadingStatus:0},computed:{getPlayersLeft:function(){var e=this.selectedSquad.filter((function(e){return e&&e.player_details.hasOwnProperty("id")}));return this.allowedSelectionCount-e.length+"/"+this.allowedSelectionCount},getForeignPlayersLeft:function(){var e=this.selectedSquad.filter((function(e){return e&&"india"!==e.player_details.nationality.toLowerCase()}));return this.allowedOverseasPlayers-e.length+"/"+this.allowedOverseasPlayers},getFilteredSquadList:function(){var e=this;return this.searchText?this.squadList.filter((function(t){return t.player_details.name.toLowerCase().includes(e.searchText.toLowerCase())})):this.squadList},mobileDevice:function(){return/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)}},methods:{clearSearch:function(e){this.searchText="",console.log(e.target);var t=e.target.parentElement;if(t){var a=t.parentElement;if(a){var s=a.querySelector("input");s&&s.focus()}}},shortenPlayerName:function(e){var t=e.split(" ");return 1===t.length?e:t.length>1?t[0].slice(0,1)+". "+t.filter((function(e,t){return t>0})).join(" "):""},selectPlayer:function(e){var t=this,a=this.deletedPlayers[0],s=a.index,l=a.playerId;if(console.log(e),this.selectedSquad.filter((function(e){return e&&"india"!==e.player_details.nationality.toLowerCase()})).length!==this.allowedOverseasPlayers||"india"===e.player_details.nationality.toLowerCase()){var i=this.selectedSquad.map((function(a,i){return i===s&&(a=e,l&&(a.player_details.id=l),t.deletedPlayers.shift()),a}));0===this.deletedPlayers.length&&(this.openSelection=!1),this.selectedSquad=i,console.log(this.selectedSquad.length)}else alert("Only 4 overseas players allowed")},removePlayer:function(e,t){this.deletedPlayers.push({index:t,playerId:e.player_details.id});var a=this.selectedSquad;a[t]=null,this.selectedSquad=a,this.$forceUpdate()},selectCaptainWK:function(e,t){"c"===t?this.captainId===this.focusedCaptainWKId?this.captainId="":(e.player_details.id===this.wicketKeeperId&&(this.wicketKeeperId=""),this.captainId=e.player_details.id):"wk"===t&&(this.wicketKeeperId===this.focusedCaptainWKId?this.wicketKeeperId="":(e.player_details.id===this.captainId&&(this.captainId=""),this.wicketKeeperId=e.player_details.id))},addRemoveInSquad:function(e){if(this.selectedSquad.length){var t=this.selectedSquad.indexOf(e);if(t>-1)this.selectedSquad.splice(t,1);else{if(this.selectedSquad.length===this.allowedSelectionCount)return void alert("11 players are selected already, please remove any player to add another.");if("india"===e.player_details.nationality.toLowerCase())this.selectedSquad.push(e);else this.selectedSquad.filter((function(e){return e&&"india"!==e.player_details.nationality.toLowerCase()})).length<this.allowedOverseasPlayers?this.selectedSquad.push(e):alert("Only 4 overseas players allowed")}}else{"india"===e.player_details.nationality.toLowerCase()||this.selectedSquad.filter((function(e){return e&&"india"!==e.player_details.nationality.toLowerCase()})).length<this.allowedOverseasPlayers?this.selectedSquad.push(e):alert("Only 4 overseas players allowed")}},fetchPlayers:function(e){return s.a(this,void 0,void 0,(function(){var t,a;return s.c(this,(function(s){switch(s.label){case 0:this.loadingStatus=1,s.label=1;case 1:return s.trys.push([1,4,,5]),[4,fetch(this.endPoints[e])];case 2:return[4,s.sent().json()];case 3:return t=s.sent(),console.log(t),Object.keys(t).length&&t.players&&(this.squadList=t.players,this.squadList=this.squadList.sort((function(e,t){var a=e.player_details.name.toUpperCase(),s=t.player_details.name.toUpperCase();return a>s?1:a<s?-1:0})),this.loadingStatus=0),[3,5];case 4:return a=s.sent(),console.log(a),this.loadingStatus=2,[3,5];case 5:return[2]}}))}))},handleDrop:function(e){var t=this;if(1!==this.selectionStep)return!0;var a=this.selectedSquad,s=a[e],l=-1,i=a.filter((function(e,a){if(e&&t.dragStartPlayerId===e.player_details.id)return l=a,e}));a[e]=i[0],a[l]=s,console.log(this.dragOverPlayerId,this.dragStartPlayerId,s,i),this.selectedSquad=a,this.dragOverPlayerId=""},handleDragOver:function(e){if(1!==this.selectionStep)return!0;this.dragOverPlayerId=e},handleDragStart:function(e){if(1!==this.selectionStep)return!0;this.dragStartPlayerId=e},handleDragEnter:function(e){if(1!==this.selectionStep)return!0;this.mobileDevice&&(this.dragStartPlayerId=e)}},mounted:function(){this.fetchPlayers(this.season),console.log(this.endPoints)}})},t}(l.b);t.default=function(){return i.ApplicationObj.register("all-team--widget-layout-1",d)}}}]);