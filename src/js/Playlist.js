import './directives/sol-vibrate';
import './directives/sol-slide-rm';
import './directives/sol-scroll2top';
import 'ui-sortable';
import './Services';
import 'angular';

function mouseCoords(event) {
    var totalOffsetX = 0,
        totalOffsetY = 0,
        canvasX = 0,
        canvasY = 0,
        currentElement = event.target;

    do {
        totalOffsetX += currentElement.offsetLeft - currentElement.scrollLeft;
        totalOffsetY += currentElement.offsetTop - currentElement.scrollTop;
        currentElement = currentElement.offsetParent;
    }
    while (currentElement);

    canvasX = event.pageX - totalOffsetX;
    canvasY = event.pageY - totalOffsetY;

    return {
        x: canvasX,
        y: canvasY
    };
}

export default angular.module('ui.playlist',
    ['services', 'filters', 'ui.sortable', 'solVibrate', 'solSlideRm', 'solScroll2top'])
    .directive('playlistPane', [
            '$rootScope', '$http', 'youtubeAPI', 'playList',
            function($rootScope, $http, youtubeAPI, playList) {
        var definitions = {
            restrict: 'E',
            templateUrl: '/html/playlist/pane.html',
            replace: true,
            scope: true,
            link: function($scope, $element, $attrs) {
                var media = window.matchMedia('(max-width:1280px),(max-device-width:1280px)');

                $scope.duration = 0;
                $scope.progress = 0;

                if (media.matches) {
                    $scope.ready = true;
                } else {
                    $rootScope.$on('searchPane:loaded', function() {
                        $scope.ready = true;
                        if (!$scope.$$phase) $scope.$digest();
                    });
                }

                $scope.publishPlaylist = () => {
                    playList.publishPlaylist();
                };

                $scope.clearPlaylist = function() {
                    playList.clearList();
                };

                $scope.isItemActive = (idx) => {
                    let state = playList.getState();
                    let playing = state === playList.st.PLAYING;
                    let active = playing && $scope.getItemProgress(idx) > 0;
                    return active || undefined;
                };

                $scope.getItemProgress = (idx) => {
                    let progress = $scope.progress;

                    if ($scope.nowPlayingIdx === idx)
                        return progress;
                };

                $scope.itemMatch = function(item, query) {
                    var matches;
                    if (!query) return true;

                    matches = item.snippet
                        .title.toLowerCase()
                        .indexOf(query.toLowerCase()) >= 0;

                    return matches || undefined;
                };

                $rootScope.$on('playList:stateChanged', function(e, state) {
                    let origIdx = $scope.nowPlayingIdx;
                    $scope.nowPlayingIdx = playList.getNowPlayingIdx();

                    if (origIdx !== $scope.nowPlayingIdx)
                        $scope.progress = 0;

                    if (!$scope.$$phase) $scope.$digest();
                });

                $scope.$on('actions-toggled', (e, value) => {
                    if (value === true) {
                        let target = e.targetScope;
                        let idx = target.idx;

                        $scope.items.forEach((item, i) => {
                            if (i === idx) return;
                            item.actionsOpen = false;
                        });
                    }
                });

                Object.assign($scope, {
                    getCurrentlyOpenIdx: () => {
                        let idx = null;

                        $scope.items.some((item, i) => {
                            if (item.actionsOpen) {
                                idx = i;
                                return true;
                            }
                        });

                        return idx;
                    }
                });

                $rootScope.$on('youtubePlayer:infoDelivery', function(e, data) {
                    if (data.info.duration)
                        $scope.duration = data.info.duration;

                    if (data.info.currentTime)
                        $scope.progress = data.info.currentTime;

                    if (!$scope.$$phase) $scope.$digest();
                });

                $scope.sortableOpts = {
                    axis: 'y',
                    handle: '.mover',
                    start: function(e, ui) {
                        $rootScope.$broadcast('closeTrackActions');
                        $scope.currentlyDragging = true;
                        if (!$scope.$$phase) $scope.$digest();
                    },
                    stop: function(e, ui) {
                        // Fix the playlist's currently playing track
                        var fromIdx = ui.item.sortable.index,
                            toIdx = ui.item.sortable.dropindex,
                            nowPlaying = playList.getNowPlayingIdx();

                        if (typeof nowPlaying === 'number') {
                            if (fromIdx < nowPlaying &&
                                toIdx >= nowPlaying) {
                                playList.setNowPlaying(nowPlaying - 1);
                            } else if (fromIdx > nowPlaying &&
                                toIdx <= nowPlaying) {
                                playList.setNowPlaying(nowPlaying + 1);
                            } else if (fromIdx === nowPlaying) {
                                playList.setNowPlaying(toIdx);
                            }
                        }

                        playList.save();
                        $scope.currentlyDragging = false;
                        if (!$scope.$$phase) $scope.$digest();
                    }
                };
            },
            controller: function($scope, $element, $attrs, $transclude) {
                $scope.items = playList.playlist;
                $scope.savePlaylist = function() {
                    playList.save();
                };
            }
        };

        return definitions;
    }]).directive('playlistProgress', ['$rootScope', 'youtubePlayer', function($rootScope, youtubePlayer) {
        var definitions = {
            restrict: 'E',
            templateUrl: '/html/playlist/progress.html',
            replace: true,
            scope: {
                progress: '=',
                duration: '@'
            },
            link: function($scope, $element, $attrs) {
                $element.on('click', function(e) {
                    var coords, time;

                    if (e.target.classList.contains('progress')) {
                        coords = mouseCoords(e);
                        time = $scope.duration * (coords.x / e.target.clientWidth);

                        youtubePlayer.seek(time);
                    }
                });
            }
        };

        return definitions;
    }]);
