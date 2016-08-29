      var map;
      function initMap() {

         var myLatLng = {lat: 14.885471, lng: 102.019597};
         
        var image = 'https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png';
        var map = new google.maps.Map(document.getElementById('map'), {
          zoom: 14,
          center: myLatLng
        });

        var marker = new google.maps.Marker({
          position: myLatLng,
          map: map,
          title: 'Hello World!',
          icon: image
        });

        var url = "http://maps.google.com/?q=loc:"+ myLatLng.lat +","+myLatLng.lng;
        
         marker.addListener('click', function() {
          window.open(url,"_self")
        });
      }