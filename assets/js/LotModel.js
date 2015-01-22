adoptalot = (function(Backbone, _, $, adoptalot) {
  var Lot = adoptalot.LotModel = Backbone.Model.extend({});

  adoptalot.LotCollection = Backbone.Collection.extend({
    model: Lot,
    url: '/lot'
  });

  return adoptalot;
})(Backbone, _, $, window.adoptalot || {});
