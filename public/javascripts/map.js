$(window).load(function() {
    // Construct the catalog query string
    url = 'http://data.southbendin.gov/resource/d2un-9vvp.json?$$app_token=CGxaHQoQlgQSev4zyUh5aR5J3';

    // Intialize our map
    var center = new google.maps.LatLng(41.6747204,-86.2758845);
    var mapOptions = {
      zoom: 14,
      center: center
    }
    var map = new google.maps.Map(document.getElementById("map"), mapOptions);

    // Retrieve our data and plot it
    $.getJSON(url, function(data, textstatus) {
          console.log(data);
          $.each(data, function(i, entry) {
              var marker = new google.maps.Marker({
                  position: new google.maps.LatLng(entry.location_1.latitude,
                                                   entry.location_1.longitude),
                  map: map,
                  title: location.name
              });
          });
    });
});
