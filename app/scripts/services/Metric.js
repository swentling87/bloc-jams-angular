(function() {
  function Metric($rootScope) {
    $rootScope.songPlays = [];

    return {
      registerSongPlay: function(songObj) {
        songObj['playedAt'] = new Date();
        $rootScope.songPlays.push(songObj);
      },
      listSongsPlayedData: function() {
        var songs = [];
        var plays = [];
        var songsPlayed = [];
        angular.forEach($rootScope.songPlays, function(song) {
        var dexer = songs.indexOf(song.title);
          if(songs.includes(song.title)){
          } else {
            songs.push(song.title);
          }

          if(songs.includes(song.title)){
            if ((plays.length == 0) || (plays[dexer] == null)) {
              plays.push(1);
            } else {
              plays[dexer] = (plays[dexer] + 1);
            }
          }
        });
        for(var i = 0; i < songs.length; i++) {
          songsPlayed.push({key: songs[i], y: plays[i]});
        }
        return songsPlayed;
      },
      listSongsPlayed: function() {
              var songs = [];
              angular.forEach($rootScope.songPlays, function(song) {
                songs.push(song.title);
              });
              return songs;
            },
      listSongsDates: function() {
              var times = [];
              angular.forEach($rootScope.songPlays, function(song) {
                times.push(song['playedAt']);
              });
              return times;
            }
    };
  }

  angular
    .module('blocJams')
    .service('Metric', ['$rootScope', Metric]);
})();
