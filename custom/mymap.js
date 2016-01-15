/**
 * Created by Sazz on 12/19/2015.
 */

var map;
var initialLocation;
var home = {lat: 23.8, lng: 90.4};
var browserSupportFlag = new Boolean();
var geoCoder = null;

var locations = ["banani, dhaka", "gulshan, dhaka", "dhanmondi, dhaka"];

function initMap() {

    map = new google.maps.Map(document.getElementById('map-container'), {
        zoom: 14,
        center: {lat: 23.8, lng: 90.4},
        mapTypeId: google.maps.MapTypeId.ROADMAP
    });

    if (navigator.geolocation) {
        browserSupportFlag = true;
        navigator.geolocation.getCurrentPosition(function (position) {
            initialLocation = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
            map.setCenter(initialLocation);
            setCurrentPlaceMarker(initialLocation, "You are here!");
        }, function () {
            handleNoGeolocation(browserSupportFlag);
            setCurrentPlaceMarker(home, "You are here!");
        });
    }
    // Browser doesn't support Geolocation
    else {
        browserSupportFlag = false;
        handleNoGeolocation(browserSupportFlag);
    }
    initGeocoder();
    for(var a=0; a< locations.length; a++){
        geoCode(locations[a]);
        console.log(locations[a]);
    }
    // geoCode();

}

function handleNoGeolocation(errorFlag) {
    if (errorFlag == true) {
        alert("Geolocation service failed.");
//                initialLocation = newyork;
    } else {
        alert("Your browser doesn't support geolocation. We've placed you in Siberia.");
//                initialLocation = siberia;
    }
//            map.setCenter(initialLocation);
}

function setCurrentPlaceMarker(currentPlace, text){
    placeMarkerAtLocation(currentPlace, text, text, "#0f0");
}

function placeMarkerAtLocation(location, title, label, color){
    var marker = new google.maps.Marker({
        position: location,
        title: title,
        label : label,
        icon: pinSymbol(color)
        // icon : 'http://maps.google.com/mapfiles/ms/icons/blue-dot.png'
    });
    marker.setMap(map);   

    marker.info = new google.maps.InfoWindow({
        content: '<b>'+title+'</b> knots'
    });

    google.maps.event.addListener(marker, 'click', function() {
        marker.info.open(map, this);
    });
}

// geocode test
function initGeocoder(){
    geoCoder = new google.maps.Geocoder();
}

function geoCode(location){
    
    if(geoCoder){
        geoCoder.geocode({address : location}, function(results, status) 
        {
            if (status == google.maps.GeocoderStatus.OK) 
            {
                var distance = getDistance(home, results[0].geometry.location);
                console.log(results[0].formatted_address+' - '+ distance);
                placeMarkerAtLocation(results[0].geometry.location, results[0].formatted_address, 'This is a label', "#367FA9");
              
            } else {
              alert('Geocode was not successful for the following reason: ' + status);
            }
        });    
    }
    
}

function pinSymbol(color) {
    return {
        path: 'M 0,0 C -2,-20 -10,-22 -10,-30 A 10,10 0 1,1 10,-30 C 10,-22 2,-20 0,0 z M -2,-30 a 2,2 0 1,1 4,0 2,2 0 1,1 -4,0',
        fillColor: color,
        fillOpacity: 0.7,
        strokeColor: '#000',
        strokeWeight: 1,
        scale: 1,
   };
}

// geocode test

// measuring distance
var rad = function(x) {
  return x * Math.PI / 180;
};

var getDistance = function(p1, p2) {
  var R = 6378137; // Earth’s mean radius in meter
  var dLat = rad(p2.lat() - p1.lat);
  var dLong = rad(p2.lng() - p1.lng);
  var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(rad(p1.lat)) * Math.cos(rad(p2.lat())) *
    Math.sin(dLong / 2) * Math.sin(dLong / 2);
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  var d = R * c;
  return d; // returns the distance in meter
};

// don't need to call this method
// $(document).ready(function () {
//     initMap();
// });
