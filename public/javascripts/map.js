var EntryModel = Backbone.Model.extend({
    infoWindowTemplate: _.template($('#map_entry_info_window_template').html()),
    idAttribute: 'state_parcel_id',

    // Display the entry info in the map InfoWindow
    displayInfoWindow: function(marker) {
        infoWindow.setContent(this.infoWindowTemplate(this.toJSON()));    // render template
        infoWindow.open(map, marker);
    }
});
siteData = new Backbone.Collection([], {model: EntryModel});



var SearchView = Backbone.View.extend({
    el: '#searchContainer',
    events: {
        'keypress #searchBox': 'enterHandler',
        'click #searchBtn': 'search'
    },
    search: function() {
        var addr = this.$('#searchBox').val();
        if(addr) {
            // attempt to geocode the input
            // TODO: Restrict to region
            geocoder.geocode( { 'address': addr }, function(results, status) {
                if (status == google.maps.GeocoderStatus.OK) {
                    map.setCenter(results[0].geometry.location);
                } else {
                    alert('Geocode was not successful for the following reason: ' + status);
                }
            });
        }
    },
    enterHandler: function(e) {
        if(e.keyCode == 13) { this.search(); }
    }
});

var FormView = Backbone.View.extend({
    el: '#formContainer',
    initialize: function(options) {
        this.listenTo(siteData, 'selected', this.handleItemSelected);
    },
    handleItemSelected: function(model) {
        this.$('#stateParcelID').val(model.id);
    }
});






$(window).load(function() {
    // Construct the catalog query string
    url = 'http://data.southbendin.gov/resource/d2un-9vvp.json?$$app_token=CGxaHQoQlgQSev4zyUh5aR5J3';

    // Intialize our map
    var center = new google.maps.LatLng(41.6747204,-86.2758845);
    var mapOptions = {
      zoom: 14,
      center: center
    }
    infoWindow = new google.maps.InfoWindow();
    geocoder = new google.maps.Geocoder();
    map = new google.maps.Map(document.getElementById("map"), mapOptions);
    formView = new FormView();
    searchView = new SearchView();


    google.maps.event.addListener(map, 'click', function() { infoWindow.close(); });

    // Retrieve our data and plot it
    $.getJSON(url, function(data, textstatus) {
          console.log('Data retrieved');
          siteData.add(data);

          $.each(data, function(i, entry) {
              var marker = new google.maps.Marker({
                  position: new google.maps.LatLng(entry.location_1.latitude,
                                                   entry.location_1.longitude),
                  map: map,
                  title: location.name
              });
              marker.set('id', entry.state_parcel_id);    // Set data entry id

              // Display info for entry on marker click
              google.maps.event.addListener(marker, 'click', function() {
                  var model = siteData.get(marker.id)
                  model.displayInfoWindow(marker);
                  siteData.trigger('selected', model);
              });
          });
    });
});
