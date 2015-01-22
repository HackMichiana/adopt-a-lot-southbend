adoptalot = (function(Marionette, _, $, adoptalot) {
  var LotListItemView = Marionette.ItemView.extend({
    template: '#tpl_lot_item_view'
  });

  adoptalot.LotListView = Marionette.CollectionView.extend({
    childView: LotListItemView,
    el: '#lot_list'
  });

  return adoptalot;
})(Marionette, _, $, window.adoptalot || {});
