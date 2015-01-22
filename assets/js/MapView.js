adoptalot = (function(Marionette, _, $, adoptalot) {
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
    onRender: function() {
      this.map = new google.maps.Map(this.ui.map[0], this.mapOptions);
    }
  });

  return adoptalot;
})(Marionette, _, $, window.adoptalot || {});
