adoptalot = (function(Marionette, Backbone, _, google, adoptalot) {
  var MarkerModel = Backbone.Model.extend({
    idAttribute: 'lot'
  })

  adoptalot.MapView = Marionette.ItemView.extend({
    el: '#map_container',
    template: false,
    mapOptions: {
      center: { lat: 41.676003, lng: -86.249964},
      zoom: 13
    },
    ui: {
      map: '#map_canvas'
    },
    initialize: function(options) {
      this.lots = options.lots;
      this.markers = new Backbone.Collection();

      this.listenTo(lots, 'add', this.showMarker);
      this.listenTo(lots, 'remove', this.removeMarker);
    },
    onRender: function() {
      this.map = new google.maps.Map(this.ui.map[0], this.mapOptions);
    },
    showMarker: function(lot) {
      var marker = new google.maps.Marker({
        position: new google.maps.LatLng(lot.get('location_1').latitude, lot.get('location_1').longitude),
        map: this.map
      });

      this.markers.add(new MarkerModel({lot: lot.id, marker: marker}));
    },
    removeMarker: function(lot) {
      var marker = this.markers.get(lot.id);
      marker.get('marker').setMap(null);
      marker.set('marker', null);

      this.markers.remove(marker);
    }
  });

  return adoptalot;
})(Marionette, Backbone, _, google, window.adoptalot || {});
