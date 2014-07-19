var searchViewModel = function () {
  var model = {};
  model.searchContent = ko.observable();

  model.search = function () {
    //make request to get map data
    //callback: fill in map data...
  };

  return model;
};

ko.applyBindings(searchViewModel());