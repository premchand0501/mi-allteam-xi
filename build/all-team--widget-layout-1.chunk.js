(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["all-team--widget-layout-1"],{

/***/ "./src/widgets/all-team/PlayersEndPoint.ts":
/*!*************************************************!*\
  !*** ./src/widgets/all-team/PlayersEndPoint.ts ***!
  \*************************************************/
/*! exports provided: endPoints */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "endPoints", function() { return endPoints; });
var endPoints = {
    2008: './1111_all_players_1075.json',
    2009: './1111_all_players_1137.json',
    2010: './1111_all_players_1184.json',
    2011: './1111_all_players_1295.json',
    2012: './1111_all_players_1380.json',
    2013: './1111_all_players_1517.json',
    2014: './1111_all_players_2173.json',
    2015: './1111_all_players_2340.json',
    2016: './1111_all_players_2569.json',
    2017: './1111_all_players_2756.json',
    2018: './1111_all_players_2940.json',
    2019: './1111_all_players_3130.json',
};


/***/ }),

/***/ "./src/widgets/all-team/widget-layout-1.ts":
/*!*************************************************!*\
  !*** ./src/widgets/all-team/widget-layout-1.ts ***!
  \*************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var stimulus__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! stimulus */ "./node_modules/stimulus/index.js");
/* harmony import */ var _main__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../main */ "./src/main.ts");
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! vue */ "./node_modules/vue/dist/vue.esm.js");
/* harmony import */ var mobile_drag_drop__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! mobile-drag-drop */ "./node_modules/mobile-drag-drop/index.min.js");
/* harmony import */ var mobile_drag_drop__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(mobile_drag_drop__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _PlayersEndPoint__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./PlayersEndPoint */ "./src/widgets/all-team/PlayersEndPoint.ts");






Object(mobile_drag_drop__WEBPACK_IMPORTED_MODULE_4__["polyfill"])();
var AllTeamXI = /** @class */ (function (_super) {
    tslib__WEBPACK_IMPORTED_MODULE_0__["__extends"](AllTeamXI, _super);
    function AllTeamXI() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    AllTeamXI.prototype.connect = function () {
        console.log('all team xi connected');
        this.initVueComponent();
    };
    AllTeamXI.prototype.initVueComponent = function () {
        new vue__WEBPACK_IMPORTED_MODULE_3__["default"]({
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
                endPoints: _PlayersEndPoint__WEBPACK_IMPORTED_MODULE_5__["endPoints"],
                loadingStatus: 0
            },
            computed: {
                getPlayersLeft: function () {
                    var validPlayers = this.selectedSquad.filter(function (p) { return p && p.player_details.hasOwnProperty('id'); });
                    return (this.allowedSelectionCount - validPlayers.length) + '/' + this.allowedSelectionCount;
                },
                getForeignPlayersLeft: function () {
                    var overseas = this.selectedSquad.filter(function (player) { return player && player.player_details.nationality.toLowerCase() !== 'india'; });
                    return (this.allowedOverseasPlayers - overseas.length) + '/' + this.allowedOverseasPlayers;
                },
                getFilteredSquadList: function () {
                    var _this = this;
                    if (this.searchText) {
                        return this.squadList.filter(function (s) { return s.player_details.name.toLowerCase().includes(_this.searchText.toLowerCase()); });
                    }
                    return this.squadList;
                },
                mobileDevice: function () {
                    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
                },
            },
            methods: {
                clearSearch: function (e) {
                    this.searchText = '';
                    console.log(e.target);
                    var btnEl = e.target;
                    var parent = btnEl.parentElement;
                    if (parent) {
                        var parentParent = parent.parentElement;
                        if (parentParent) {
                            var input = parentParent.querySelector('input');
                            input && input.focus();
                        }
                    }
                },
                shortenPlayerName: function (name) {
                    var wordArr = name.split(' ');
                    if (wordArr.length === 1) {
                        return name;
                    }
                    else if (wordArr.length > 1) {
                        var firstWord = wordArr[0];
                        var firstLetter = firstWord.slice(0, 1) + '. ';
                        var remaining = wordArr.filter(function (_, i) { return i > 0; });
                        var remainingName = remaining.join(' ');
                        return firstLetter + remainingName;
                    }
                    return '';
                },
                selectPlayer: function (player) {
                    var _this = this;
                    var _a = this.deletedPlayers[0], index = _a.index, playerId = _a.playerId;
                    console.log(player);
                    var overseas = this.selectedSquad.filter(function (player) { return player && player.player_details.nationality.toLowerCase() !== 'india'; });
                    if (overseas.length === this.allowedOverseasPlayers && player.player_details.nationality.toLowerCase() !== 'india') {
                        alert('Only 4 overseas players allowed');
                        return;
                    }
                    var squad = this.selectedSquad.map(function (p, ind) {
                        if (ind === index) {
                            p = player;
                            playerId && (p.player_details.id = playerId);
                            _this.deletedPlayers.shift();
                        }
                        return p;
                    });
                    if (this.deletedPlayers.length === 0) {
                        this.openSelection = false;
                    }
                    this.selectedSquad = squad;
                    console.log(this.selectedSquad.length);
                },
                removePlayer: function (player, index) {
                    this.deletedPlayers.push({ index: index, playerId: player.player_details.id });
                    var squadList = this.selectedSquad;
                    squadList[index] = null;
                    this.selectedSquad = squadList;
                    this.$forceUpdate();
                },
                selectCaptainWK: function (player, type) {
                    if (type === 'c') {
                        if (this.captainId === this.focusedCaptainWKId) {
                            this.captainId = '';
                        }
                        else {
                            if (player.player_details.id === this.wicketKeeperId) {
                                this.wicketKeeperId = '';
                            }
                            this.captainId = player.player_details.id;
                        }
                    }
                    else if (type === 'wk') {
                        if (this.wicketKeeperId === this.focusedCaptainWKId) {
                            this.wicketKeeperId = '';
                        }
                        else {
                            if (player.player_details.id === this.captainId) {
                                this.captainId = '';
                            }
                            this.wicketKeeperId = player.player_details.id;
                        }
                    }
                },
                addRemoveInSquad: function (player) {
                    if (!this.selectedSquad.length) {
                        if (player.player_details.nationality.toLowerCase() === 'india') {
                            this.selectedSquad.push(player);
                        }
                        else {
                            var overseas = this.selectedSquad.filter(function (player) { return player && player.player_details.nationality.toLowerCase() !== 'india'; });
                            if (overseas.length < this.allowedOverseasPlayers)
                                this.selectedSquad.push(player);
                            else
                                alert('Only 4 overseas players allowed');
                        }
                        return;
                    }
                    var foundIndex = this.selectedSquad.indexOf(player);
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
                            var overseas = this.selectedSquad.filter(function (player) { return player && player.player_details.nationality.toLowerCase() !== 'india'; });
                            if (overseas.length < this.allowedOverseasPlayers)
                                this.selectedSquad.push(player);
                            else
                                alert('Only 4 overseas players allowed');
                        }
                    }
                },
                fetchPlayers: function (season) {
                    return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function () {
                        var res, i, e_1;
                        return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    this.loadingStatus = 1;
                                    _a.label = 1;
                                case 1:
                                    _a.trys.push([1, 4, , 5]);
                                    return [4 /*yield*/, fetch(this.endPoints[season])];
                                case 2: return [4 /*yield*/, (_a.sent()).json()];
                                case 3:
                                    res = (_a.sent());
                                    console.log(res);
                                    if (Object.keys(res).length && res.players) {
                                        this.squadList = res.players;
                                        this.squadList = this.squadList.sort(function (p1, p2) {
                                            var a = p1.player_details.name.toUpperCase();
                                            var b = p2.player_details.name.toUpperCase();
                                            if (a > b) {
                                                return 1;
                                            }
                                            if (a < b) {
                                                return -1;
                                            }
                                            return 0;
                                        });
                                        // this.selectedSquad = this.squadList.slice(0, 11);
                                        for (i = 0; i < this.allowedSelectionCount; i++) {
                                            this.selectedSquad[i] = null;
                                            this.deletedPlayers[i] = { index: i, playerId: '' };
                                        }
                                        this.selectionStep = 1;
                                        console.log(this.selectedSquad);
                                        this.loadingStatus = 0;
                                    }
                                    return [3 /*break*/, 5];
                                case 4:
                                    e_1 = _a.sent();
                                    console.log(e_1);
                                    this.loadingStatus = 2;
                                    return [3 /*break*/, 5];
                                case 5: return [2 /*return*/];
                            }
                        });
                    });
                },
                handleDrop: function (index) {
                    var _this = this;
                    if (this.selectionStep !== 1) {
                        return true;
                    }
                    var squad = this.selectedSquad;
                    var droppedOnPlayer = squad[index];
                    var droppingPlayerId = -1;
                    var droppingPlayer = squad.filter(function (player, index) {
                        if (player && _this.dragStartPlayerId === player.player_details.id) {
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
                handleDragOver: function (playerId) {
                    if (this.selectionStep !== 1) {
                        return true;
                    }
                    this.dragOverPlayerId = playerId;
                },
                handleDragStart: function (playerId) {
                    if (this.selectionStep !== 1) {
                        return true;
                    }
                    this.dragStartPlayerId = playerId;
                },
                handleDragEnter: function (playerId) {
                    if (this.selectionStep !== 1) {
                        return true;
                    }
                    if (this.mobileDevice)
                        this.dragStartPlayerId = playerId;
                },
            },
            mounted: function () {
                this.fetchPlayers(this.season);
                console.log(this.endPoints);
            }
        });
    };
    return AllTeamXI;
}(stimulus__WEBPACK_IMPORTED_MODULE_1__["Controller"]));
/* harmony default export */ __webpack_exports__["default"] = (function () { return _main__WEBPACK_IMPORTED_MODULE_2__["ApplicationObj"].register('all-team--widget-layout-1', AllTeamXI); });


/***/ })

}]);
//# sourceMappingURL=all-team--widget-layout-1.chunk.js.map