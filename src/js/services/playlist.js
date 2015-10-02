import '../../modules/sol-backend/sol-backend';

var hasLS = !!window.localStorage;

export default [
    '$q', '$timeout', 'youtubePlayer', 'youtubeAPI', 'playListVolume', 'solBackend', '$rootScope',
    function($q, $timeout, ytPlayer, ytAPI, playListVolume, solBackend, $rootScope) {
    var nowPlaying = null,
        st = {
            UNKNOWN: -1,
            INITIAL: 0,
            PLAYING: 1,
            PAUSING: 2,
            STOPPED: 3,
            BUFFERING: 4
        },
        state = st.INITIAL,
        currentTime = 0,
        that = this;

    this.st = st;
    this.playlist = [];

    getSavedList().then((list) => {
        //that.clearList();
        that.playlist.length = 0;
        list.forEach((item) => that.playlist.push(item));
    });

    $rootScope.$on('youtubePlayer:infoDelivery', function(e, data) {
        if (data.info.hasOwnProperty('currentTime')) {
            currentTime = data.info.currentTime;
        }
    });
    $rootScope.$on('youtubePlayer:onStateChange', function(e, data) {
        var currentItem,
            stopAt,
            playNext;
        if (data.info === YT.PlayerState.PLAYING) {
            state = st.PLAYING;
            setNowPlaying(nowPlaying);
        }
        if (data.info === YT.PlayerState.PAUSED) {
            state = st.PAUSING;
            setNowPlaying(false);
        }
        if (data.info === YT.PlayerState.ENDED) {
            state = st.STOPPED;
            currentItem = that.getNowPlaying();
            stopAt = getStopAt();
            playNext = getPlayNext();

            if (currentItem.repeatTrack)
                that.play(nowPlaying);

            else if (typeof playNext === 'number') {
                that.play(playNext);
                that.playlist[playNext].playNext = false;
            } else if (stopAt === nowPlaying) {
                setNowPlaying(null);
                currentItem.stopHere = false;
            } else if (that.hasNext())
                that.next();

            else
                setNowPlaying(null);
        }
        if (data.info === YT.PlayerState.BUFFERING) {
            state = st.BUFFERING;
        }
        $rootScope.$broadcast('playList:stateChanged', state);
    });

    // Register keyboard sortcuts
    document.addEventListener('keyup', function(e) {
        var actions = {
            // Space
            32: function() {
                that.togglePlay();
            },
            // Left Arrow
            37: function() {
                var seekTo = currentTime - 5 >= 0 ?
                    currentTime - 5 :
                    0;
                ytPlayer.seek(seekTo);
            },
            // Right Arrow
            39: function() {
                ytPlayer.seek(currentTime + 5);
            }
        };

        if (e.target.tagName.toLowerCase() !== 'input' &&
            actions.hasOwnProperty(e.keyCode)) {
            e.preventDefault();
            actions[e.keyCode]();
        }
    });

    function getSavedList() {
        return $q((resolve, reject) => {
            let hash = window.location.hash;
            if (!hash.length) {
                reject();
                return;
            }

            let matches = hash.match(/#.*?&?playlist=(.*)&?/);
            let playlistId = matches && matches[1];

            if (!playlistId) {
                reject();
                return;
            }

            solBackend.fetchPlaylist(playlistId).then(resolve, reject);
        }).catch(() => {
            let list = [];
            let lsVal;

            if (hasLS) {
                lsVal = localStorage.playlist;
                if (lsVal) list = JSON.parse(lsVal);
            }

            return list;
        });
    }

    function setNowPlaying(idx) {
        var endingSound;
        if (typeof idx === 'number')
            nowPlaying = idx;
        else if (idx === null) {
            nowPlaying = null;
            $rootScope.$broadcast('toast::notify', {
                text: 'The playlist has ended.'
            });
            endingSound = new Audio('js/assets/indian-bell-chime.wav');
            endingSound.volume = playListVolume.get() / 100;
            endingSound.play();
        }

    }

    function getPlayNext() {
        var idx;
        that.playlist.forEach(function(item, i) {
            if (item.playNext)
                idx = i;
        });
        return idx;
    }

    function getStopAt() {
        var idx;
        that.playlist.forEach(function(item, i) {
            if (item.stopHere)
                idx = i;
        });
        return idx;
    }

    this.saveList = function(name) {
        if (hasLS) {
            if (typeof name !== 'string')
                name = 'playlist';
            localStorage[name] = JSON.stringify(that.playlist);
        }
    };

    this.clearList = function() {
        if (state !== st.INITIAL) this.stop();

        this.playlist.length = 0;
        this.saveList();
    };

    this.addItem = function(idx, item) {
        that.playlist.splice(idx, 0, item);
        this.saveList();
    };

    this.removeItem = function(idx) {
        that.playlist.splice(idx, 1);

        // Fix the 'nowPlaying' var, if necessary
        if (idx < nowPlaying) {
            nowPlaying -= 1;
        }

        this.saveList();
    };

    this.getState = function() {
        return state;
    };

    this.save = function() {
        this.saveList();
    };

    this.setNowPlaying = function(idx) {
        return setNowPlaying(idx);
    };

    this.getNowPlaying = function() {
        return that.playlist[nowPlaying];
    };

    this.getNowPlayingIdx = function() {
        return nowPlaying;
    };

    this.add = function(videoId, idx) {
        var that = this;

        ytAPI.getVideo(videoId).then(function(resp) {
            var item = resp.data.items[0],
                thumb = item.snippet.thumbnails.default.url,
                title = item.snippet.title,
                trimmed = title.length >= 30 ? title.substr(0, 27) + '...' :
                title,
                text = 'Track "' + trimmed + '" has been added to playlist';

            that.addItem(idx, item);
            if (that.playlist.length === 1 ||
                (idx === that.playlist.length - 1 && state === st.STOPPED))
                that.play(idx);

            $rootScope.$broadcast('toast::notify', {
                thumb: thumb,
                text: text
            });
        });
    };

    this.addFirst = function(videoId) {
        this.add(videoId, 0);
    };

    this.addLast = function(videoId) {
        this.add(videoId, this.playlist.length);
    };

    this.remove = function(idx) {
        var fixPlay = (idx === nowPlaying),
            isLast = (idx === this.playlist.length - 1);
        this.removeItem(idx);

        if (fixPlay) {
            if (isLast) {
                this.stop();
            } else {
                this.play(idx, true);
            }
        } else
            this.play();
    };

    this.togglePlay = function() {
        if (state === st.PLAYING) this.pause();
        else this.play();
    };

    this.play = function(index, force) {
        var idx = typeof index === 'number' ? index : (nowPlaying || 0),
            videoId = this.playlist[idx].id;

        if (idx === nowPlaying && !force) {
            return ytPlayer.play();
        } else {
            return ytPlayer.loadVideo(videoId).then(function() {
                ytPlayer.play();
                setNowPlaying(idx);
            });
        }
    };

    this.pause = function() {
        ytPlayer.pause();
        //setNowPlaying(false);
    };

    this.stop = function() {
        ytPlayer.seek(0);
        ytPlayer.stop();
        setNowPlaying(null);
    };

    this.next = function() {
        if (this.hasNext())
            this.play(nowPlaying + 1);
    };

    this.hasNext = function() {
        return nowPlaying < this.playlist.length - 1;
    };

    this.prev = function() {
        if (nowPlaying !== 0)
            this.play(nowPlaying - 1);
    };

    this.playNext = function(idx) {
        var that = this;
        that.playlist.forEach(function(item) {
            item.playNext = false;
        });
        if (typeof idx === 'number')
            that.playlist[idx].playNext = true;

        this.saveList();
    };

    this.stopAt = function(idx) {
        var that = this;
        that.playlist.forEach(function(item) {
            item.stopHere = false;
        });
        if (typeof idx === 'number')
            that.playlist[idx].stopHere = true;

        this.saveList();
    };

    this.repeatTrack = function(idx) {
        var that = this;
        that.playlist.forEach(function(item) {
            item.repeatTrack = false;
        });
        if (typeof idx === 'number')
            that.playlist[idx].repeatTrack = true;

        this.saveList();
    };

    this.publishPlaylist = function () {
        solBackend.publishPlaylist(this.playlist).then((refKey) => {
            $rootScope.$broadcast('toast::notify', {
                text: `${window.location.origin}#playlist=${refKey}`,
                persist: true
            });
        }).catch(() => {
            $rootScope.$broadcast('toast::notify', {
                text: 'Failed publishing playlist... :(',
                persist: true
            });
        });
    };
}];
