(function() {
  function MetricCtrl($scope, Metric){
    this.list = Metric.listSongsPlayed();
  }

  angular
    .module('blocJams')
    .controller('MetricCtrl', ['$scope', 'Metric', MetricCtrl]);
})();
