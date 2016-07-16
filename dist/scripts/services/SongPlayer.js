(function() {
  function SongPlayer(Fixtures) {
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
        currentBuzzObject.stop();
        SongPlayer.currentSong.playing = null;
      }

      currentBuzzObject = new buzz.sound(song.audioUrl, {
        formats: ['mp3'],
        preload: true
      });
      SongPlayer.currentSong = song;
    };

    var getSongIndex = function(song) {
      return currentAlbum.songs.indexOf(song);
    };
/**
* @desc Sets the current song file to null as default
* @type {Object}
*/
    SongPlayer.currentSong = null;
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
        currentBuzzObject.stop();
        SongPlayer.currentSong.playing = null;
      } else {
        var song = currentAlbum.songs[currentSongIndex];
        setSong(song);
        playSong(song);
      }
    }

    return SongPlayer;
  }

  angular
    .module('blocJams')
    .factory('SongPlayer', SongPlayer);
})();
