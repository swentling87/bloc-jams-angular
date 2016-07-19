(function() {
  function SongPlayer($rootScope, Fixtures) {
/**
* @desc Sets the SongPlayer object to an empty object as default
* @type {Object}
*/
    var SongPlayer = {};

    var currentAlbum = Fixtures.getAlbum();

/**
* @desc Buzz object audio file
* @type {Object}
*/
    var currentBuzzObject = null;

/**
 * @function setSong
 * @desc Stops currently playing song and loads new audio file as currentBuzzObject
 * @param {Object} song
 */
    var setSong = function(song) {
      if(currentBuzzObject) {
        stopSong();
      }

      currentBuzzObject = new buzz.sound(song.audioUrl, {
        formats: ['mp3'],
        preload: true
      });

      currentBuzzObject.bind('timeupdate', function() {
        $rootScope.$apply(function() {
          SongPlayer.currentTime = currentBuzzObject.getTime();
        });
      });

      SongPlayer.currentSong = song;
    };
/**
 * @function getSongIndex
 * @desc returns the index of the song in the selected album
 * @param {Object} song
 */
    var getSongIndex = function(song) {
      return currentAlbum.songs.indexOf(song);
    };

/**
 * @function stopSong
 * @desc stops the current song and sets it to null
 * @param {Object} song
 */
    var stopSong = function() {
      currentBuzzObject.stop();
      SongPlayer.currentSong.playing = null;
    };
/**
* @desc Sets the current song file to null as default
* @type {Object}
*/
    SongPlayer.currentSong = null;

/**
 * @desc Current playback time (in seconds) of currently playing song
 * @type {Number}
 */
     SongPlayer.currentTime = null;
/**
 * @function playSong
 * @desc Starts the selected song and loads the selected audio file as currentBuzzObject
 * @param {Object} song
 */
    var playSong = function(song) {
      currentBuzzObject.play();
      song.playing = true;
    };

/**
 * @function SongPlayer.play
 * @desc Sets the song and plays the song and provides the conditional statement to provide start and pause functionality
 * @param {Object} song
 */
    SongPlayer.play = function(song) {
      song = song || SongPlayer.currentSong;
      if (SongPlayer.currentSong !== song) {
      setSong(song);
      playSong(song);

      } else if (SongPlayer.currentSong === song) {
        if(currentBuzzObject.isPaused()) {
          currentBuzzObject.play();
        }
      }
    };
/**
 * @function SongPlayer.pause
 * @desc Pauses the selected song
 * @param {Object} song
 */
    SongPlayer.pause = function(song) {
      song = song || SongPlayer.currentSong;
      currentBuzzObject.pause();
      song.playing = false;
    };

/**
 * @function SongPlayer.previous
 * @desc  Selects the previous song in relation to the current song
 * @param {Object} song
 */
    SongPlayer.previous = function() {
      var currentSongIndex = getSongIndex(SongPlayer.currentSong);
      currentSongIndex--;

      if(currentSongIndex < 0 ) {
        stopSong();
      } else {
        var song = currentAlbum.songs[currentSongIndex];
        setSong(song);
        playSong(song);
      }
    }
/**
 * @function SongPlayer.previous
 * @desc  Selects the previous song in relation to the current song
 * @param {Object} song
 */
    SongPlayer.next = function() {
      var currentSongIndex = getSongIndex(SongPlayer.currentSong);
      currentSongIndex++;

      if(currentSongIndex > (currentAlbum.songs.length - 1)  ) {
        stopSong();
      } else {
        var song = currentAlbum.songs[currentSongIndex];
        setSong(song);
        playSong(song);
      }
    }

/**
* @function setCurrentTime
* @desc Set current time (inseconds) of currently playing song
* @param {Number} time
*/
    SongPlayer.setCurrentTime = function(time) {
      if (currentBuzzObject) {
        currentBuzzObject.setTime(time);
      }
    };

    return SongPlayer;
  }

  var filterTimeCode = function(timeInSeconds) {
    var seconds = Number.parseFloat(timeInSeconds);
    var wholeSeconds = Math.floor(seconds);
    var minutes = Math.floor(wholeSeconds / 60);

    var remainingSeconds = wholeSeconds % 60;
    var output = minutes + ':';

    if (remainingSeconds < 10) {
        output += '0';
    }

    output += remainingSeconds;
    return output;
};

  angular
    .module('blocJams')
    .factory('SongPlayer', ['$rootScope', 'Fixtures', SongPlayer]);
})();
