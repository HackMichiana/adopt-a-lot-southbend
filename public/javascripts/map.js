$(window).load(function() {
    // Construct the catalog query string
    url = 'http://data.southbendin.gov/resource/d2un-9vvp.json?$$app_token=CGxaHQoQlgQSev4zyUh5aR5J3';

    // Intialize our map
    var center = new google.maps.LatLng(41.6747204,-86.2758845);
    var mapOptions = {
      zoom: 14,
      center: center
    }
    map = new google.maps.Map(document.getElementById("map"), mapOptions);
    infoWindow = new google.maps.InfoWindow();



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
                  siteData.get(marker.id).displayInfoWindow(marker);
              });
          });
    });
});
