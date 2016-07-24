(function() {
  function Metric($rootScope) {
    $rootScope.songPlays = [];
    $rootScope.pageViews = [];

    return {
      registerSongPlay: function(songObj) {
        songObj['playedAt'] = new Date();
        $rootScope.songPlays.push(songObj);
      },
      listSongsPlayed: function() {
        var songs = [];
        angular.forEach($rootScope.songPlays, function(song) {
          songs.push(song.title, song['playedAt']);
        });
        return songs;
      }
    };
  }

  angular
    .module('blocJams')
    .service('Metric', ['$rootScope', Metric]);
})();
