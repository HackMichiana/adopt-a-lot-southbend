function initialize() {

  mapview = new adoptalot.MapView();
  mapview.render();

  lots = new adoptalot.LotCollection();
  lotslist = new adoptalot.LotListView({collection: lots});
  lotslist.render();
  lots.fetch();
}

$(document).ready(initialize);
