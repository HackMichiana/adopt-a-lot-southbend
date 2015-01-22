function initialize() {

  lots = new adoptalot.LotCollection();
  mapview = new adoptalot.MapView({lots: lots});
  lotslist = new adoptalot.LotListView({collection: lots});

  mapview.render();
  lotslist.render();
  lots.fetch({data: {limit: 500}});
}

$(document).ready(initialize);
