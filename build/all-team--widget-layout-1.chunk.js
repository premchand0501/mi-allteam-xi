(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["all-team--widget-layout-1"],{

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
/* harmony import */ var mobile_drag_drop_scroll_behaviour__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! mobile-drag-drop/scroll-behaviour */ "./node_modules/mobile-drag-drop/scroll-behaviour.js");
/* harmony import */ var mobile_drag_drop_scroll_behaviour__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(mobile_drag_drop_scroll_behaviour__WEBPACK_IMPORTED_MODULE_5__);





// optional import of scroll behaviour

// options are optional ;)
Object(mobile_drag_drop__WEBPACK_IMPORTED_MODULE_4__["polyfill"])({
    // use this to make use of the scroll behaviour
    dragImageTranslateOverride: mobile_drag_drop_scroll_behaviour__WEBPACK_IMPORTED_MODULE_5__["scrollBehaviourDragImageTranslateOverride"]
});
var AllTeamXI = /** @class */ (function (_super) {
    tslib__WEBPACK_IMPORTED_MODULE_0__["__extends"](AllTeamXI, _super);
    function AllTeamXI() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    // squadList: SquadInfo[];
    // squadListTarget: HTMLUListElement;
    // static targets = ['squadList'];
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
                getPlayersLeft: function () {
                    return (this.allowedSelectionCount - this.selectedSquad.length) + '/' + this.allowedSelectionCount;
                },
                getForeignPlayersLeft: function () {
                    var overseas = this.selectedSquad.filter(function (player) { return player.nationality.toLowerCase() !== 'india'; });
                    return (this.allowedOverseasPlayers - overseas.length) + '/' + this.allowedOverseasPlayers;
                },
                getFilteredSquadList: function () {
                    var _this = this;
                    if (this.filterText) {
                        var filtered = this.squadList.filter(function (s) { return s.season_year === _this.filterText; });
                        if (this.searchText) {
                            return filtered.filter(function (s) { return s.name.toLowerCase().includes(_this.searchText.toLowerCase()) && s.season_year === _this.filterText; });
                        }
                        else {
                            return filtered;
                        }
                    }
                    else if (this.searchText) {
                        return this.squadList.filter(function (s) { return s.name.toLowerCase().includes(_this.searchText.toLowerCase()); });
                    }
                    return this.squadList;
                },
                mobileDevice: function () {
                    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
                },
            },
            methods: {
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
                    var index = this.deletedPlayers[0];
                    var squad = this.selectedSquad.map(function (p, ind) {
                        if (ind === index) {
                            p = player;
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
                removePlayer: function (player) {
                    var _this = this;
                    var squadList = this.selectedSquad.map(function (p, index) {
                        if (p.id === player.id) {
                            _this.deletedPlayers.push(index);
                            delete p.id;
                        }
                        return p;
                    });
                    this.selectedSquad = squadList;
                    this.$forceUpdate();
                },
                selectCaptainVC: function (player, type) {
                    if (type === 'c') {
                        if (this.captainId === this.focusedCaptainVCId) {
                            this.captainId = '';
                        }
                        else {
                            if (player.id === this.viceCaptainId) {
                                this.viceCaptainId = '';
                            }
                            this.captainId = player.id;
                        }
                    }
                    else if (type === 'vc') {
                        if (this.viceCaptainId === this.focusedCaptainVCId) {
                            this.viceCaptainId = '';
                        }
                        else {
                            if (player.id === this.captainId) {
                                this.captainId = '';
                            }
                            this.viceCaptainId = player.id;
                        }
                    }
                },
                addRemoveInSquad: function (player) {
                    if (!this.selectedSquad.length) {
                        if (player.nationality.toLowerCase() === 'india') {
                            this.selectedSquad.push(player);
                        }
                        else {
                            var overseas = this.selectedSquad.filter(function (player) { return player.nationality.toLowerCase() !== 'india'; });
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
                        if (player.nationality.toLowerCase() === 'india') {
                            this.selectedSquad.push(player);
                        }
                        else {
                            var overseas = this.selectedSquad.filter(function (player) { return player.nationality.toLowerCase() !== 'india'; });
                            if (overseas.length < this.allowedOverseasPlayers)
                                this.selectedSquad.push(player);
                            else
                                alert('Only 4 overseas players allowed');
                        }
                    }
                },
                fetchPlayers: function () {
                    return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function () {
                        var res;
                        return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_a) {
                            switch (_a.label) {
                                case 0: return [4 /*yield*/, fetch('/squad.json')];
                                case 1: return [4 /*yield*/, (_a.sent()).json()];
                                case 2:
                                    res = (_a.sent());
                                    console.log(res);
                                    if (res.length) {
                                        this.squadList = res;
                                        this.selectedSquad = this.squadList.slice(0, 11);
                                    }
                                    return [2 /*return*/];
                            }
                        });
                    });
                },
                handleDrop: function (index) {
                    var _this = this;
                    var squad = this.selectedSquad;
                    var droppedOnPlayer = squad[index];
                    var droppingPlayerId = -1;
                    var droppingPlayer = squad.filter(function (player, index) {
                        if (_this.dragStartPlayer === player.id) {
                            droppingPlayerId = index;
                            return player;
                        }
                    });
                    squad[index] = droppingPlayer[0];
                    squad[droppingPlayerId] = droppedOnPlayer;
                    this.selectedSquad = squad;
                    this.dragOverPlayerId = '';
                },
                handleDragOver: function (playerId) {
                    this.dragOverPlayerId = playerId;
                },
                handleDragStart: function (playerId) {
                    this.dragStartPlayer = playerId;
                },
                handleDragEnter: function (playerId) {
                    if (this.mobileDevice)
                        this.dragStartPlayer = playerId;
                },
            },
            mounted: function () {
                this.fetchPlayers();
            }
        });
    };
    return AllTeamXI;
}(stimulus__WEBPACK_IMPORTED_MODULE_1__["Controller"]));
/* harmony default export */ __webpack_exports__["default"] = (function () { return _main__WEBPACK_IMPORTED_MODULE_2__["ApplicationObj"].register('all-team--widget-layout-1', AllTeamXI); });


/***/ })

}]);
//# sourceMappingURL=all-team--widget-layout-1.chunk.js.map