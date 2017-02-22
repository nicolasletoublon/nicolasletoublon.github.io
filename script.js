angular.module('2048', [])
    .controller('testController', ['$timeout', function ($timeout) {
        var self = this;

        init();

        function init() {
            var i, j, initTile, x = 4,
                y = 4;

            self.score = 0;
            self.tiles = [];

            var index = 0;
            for (i = 0; i < x; i++) {
                for (j = 0; j < y; j++) {
                    self.tiles.push({index: index, x: i, y: j, value: 0, merged: false});
                    index++;
                }
            }

            initTile = self.tiles[Math.floor(Math.random() * self.tiles.length)];
            initTile.value = 2;
        }

        self.getLabel = function (value) {
            return value ? value : '';
        };

        self.getClass = function (value) {
            return 'tile-' + value;
        };

        var oneThingMoved = false;
        var moves = 0;

        function move(valueTile, propertyChange, propertyStay, operation) {
            var numberOfmoves = 0;

            var nextTile = _.find(self.tiles, function (tile) {
                if (tile[propertyChange] === (valueTile[propertyChange] + operation) && (tile[propertyStay] === valueTile[propertyStay])) {
                    return tile;
                }
            });

            if (nextTile) {
                if (nextTile.value === 0) {
                    self.tiles[nextTile.index].value = self.tiles[valueTile.index].value;
                    self.tiles[valueTile.index].value = 0;
                    numberOfmoves++;
                }
                if (nextTile.value === valueTile.value) {
                    if (!valueTile.merged) {
                        self.tiles[nextTile.index].value = nextTile.value * 2;
                        self.score += nextTile.value;
                        self.tiles[nextTile.index].merged = true;
                        self.tiles[valueTile.index].value = 0;
                        numberOfmoves++;
                    }
                }
            }

            if (numberOfmoves !== 0) {
                oneThingMoved = true;
                moves++;
                move(nextTile, propertyChange, propertyStay, operation);
            } else {
                return;
            }
        }

        function moveAll(propertyChange, propertyStay, operation) {
            var newMoves = angular.copy(moves);

            var tilesWithValue = _.filter(self.tiles, function (tile) {
                return tile.value > 0;
            });

            _.forEach(tilesWithValue, function (valueTile) {
                move(valueTile, propertyChange, propertyStay, operation);
            });

            if (newMoves !== moves) {
                moveAll(propertyChange, propertyStay, operation);
            } else {
                return;
            }
        }

        $('html').keydown(function (event) {

            _.forEach(self.tiles, function (tile) {
                tile.merged = false;
            });

            oneThingMoved = false;
            if (event.keyCode === 38) {
                // up
                moveAll('x', 'y', -1);
            } else if (event.keyCode === 40) {
                // down
                moveAll('x', 'y', +1);
            } else if (event.keyCode === 37) {
                // left
                moveAll('y', 'x', -1);
            } else if (event.keyCode === 39) {
                // right
                moveAll('y', 'x', +1);
            }

            if (oneThingMoved) {
                addNewTile();
            }

            checkTiles();
            $timeout(function () {
            });
        });

        function addNewTile() {
            var tilesWithoutValue = _.filter(self.tiles, function (tile) {
                return tile.value === 0;
            });

            if (tilesWithoutValue.length) {
                var newTile = tilesWithoutValue[Math.floor(Math.random() * tilesWithoutValue.length)];
                if ((Math.random() * 10) > 9) {
                    self.tiles[newTile.index].value = 4;
                } else {
                    self.tiles[newTile.index].value = 2;
                }
            }
        }

        function checkTiles() {
            var gameOver = false;
            var number = 0;

            var tilesWithoutValue = _.filter(self.tiles, function (tile) {
                return tile.value === 0;
            });

            if (!tilesWithoutValue.length) {
                _.forEach(self.tiles, function (tileToCheck) {
                    if (gameOver) {
                        return;
                    }
                    var upTile = _.find(self.tiles, function (tile) {
                            if (tile.x === tileToCheck.x - 1 && tile.y === tileToCheck.y) {
                                return tile;
                            }
                        }) || {};

                    var downTile = _.find(self.tiles, function (tile) {
                            if (tile.x === tileToCheck.x + 1 && tile.y === tileToCheck.y) {
                                return tile;
                            }
                        }) || {};

                    var leftTile = _.find(self.tiles, function (tile) {
                            if (tile.y === tileToCheck.y - 1 && tile.x === tileToCheck.x) {
                                return tile;
                            }
                        }) || {};

                    var rightTile = _.find(self.tiles, function (tile) {
                            if (tile.y === tileToCheck.y + 1 && tile.x === tileToCheck.x) {
                                return tile;
                            }
                        }) || {};

                    if (upTile.value === tileToCheck.value ||
                        downTile.value === tileToCheck.value ||
                        rightTile.value === tileToCheck.value ||
                        leftTile.value === tileToCheck.value) {
                        gameOver = false;
                    } else {
                        number++;
                    }
                });

                if (number === 16) {
                    gameover();
                    return;
                }
            }
        }

        function gameover() {
            self.message = 'game over';
        }
    }]);
