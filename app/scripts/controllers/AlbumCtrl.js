(function() {
  function AlbumCtrl(Fixtures, SongPlayer, Metric) {
    this.albumData = Fixtures.getAlbum();
    this.songPlayer = SongPlayer;
  }

  angular
    .module('blocJams')
    .controller('AlbumCtrl', ['Fixtures', 'SongPlayer', 'Metric', AlbumCtrl]);
})();
