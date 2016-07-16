(function() {
  function SongPlayer() {
/**
* @desc Sets the SongPlayer object to an empty object as default
* @type {Object}
*/
    var SongPlayer = {};

/**
* @desc Sets the current song file to null as default
* @type {Object}
*/
    var currentSong = null;

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
        currentSong.playing = null;
      }

      currentBuzzObject = new buzz.sound(song.audioUrl, {
        formats: ['mp3'],
        preload: true
      });
      currentSong = song;
    };
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
      if (currentSong !== song) {
      setSong(song);
      playSong(song);

      } else if (currentSong === song) {
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
      currentBuzzObject.pause();
      song.playing = false;
    };

    return SongPlayer;
  }

  angular
    .module('blocJams')
    .factory('SongPlayer', SongPlayer);
})();
