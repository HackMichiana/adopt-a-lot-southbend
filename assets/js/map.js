function initialize() {
  var limit = 100;
  var page = 1;
  fetchNext = function() {
    lots.fetch({data: {limit: limit, skip: (page++)*limit}});
  }

  lots = new adoptalot.LotCollection();
  mapview = new adoptalot.MapView({lots: lots});
  lotslist = new adoptalot.LotListView({collection: lots});

  mapview.render();
  lotslist.render();
  // lots.fetch({data: {limit: 100, skip: 0}});
  fetchNext();

  $('#next_page').click(function(e) {
    e.preventDefault();
    fetchNext();
  });
}

$(document).ready(initialize);
