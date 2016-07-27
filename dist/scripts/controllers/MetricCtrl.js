(function() {
  function MetricCtrl(Metric, $scope){
    this.list = Metric.listSongsPlayedData();
    this.names = Metric.listSongsPlayed();
    this.times = Metric.listSongsDates();

    $scope.options = {
       chart: {
           type: 'pieChart',
           height: 450,
           donut: true,
           x: function(d){return d.key;},
           y: function(d){return d.y;},
           showLabels: true,

           pie: {
               startAngle: function(d) { return d.startAngle/2 -Math.PI/2 },
               endAngle: function(d) { return d.endAngle/2 -Math.PI/2 }
           },
           duration: 500,
           legend: {
               margin: {
                   top: 5,
                   right: 140,
                   bottom: 5,
                   left: 0
               }
           }
       }
   };
   $scope.data = this.list;
  }

  angular
    .module('blocJams')
    .controller('MetricCtrl', ['Metric', '$scope', MetricCtrl]);
})();
