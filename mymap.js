/**
 * Created by Sazz on 12/19/2015.
 */

var map;
var initialLocation;
var browserSupportFlag = new Boolean();

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
            setCurrentPlaceMarker();
        }, function () {
            handleNoGeolocation(browserSupportFlag);
        });
    }
    // Browser doesn't support Geolocation
    else {
        browserSupportFlag = false;
        handleNoGeolocation(browserSupportFlag);
    }

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

function setCurrentPlaceMarker(){
    var marker = new google.maps.Marker({
        map: map,
        position: initialLocation,
        title: 'Your Location'
    });
    marker.setMap(map);
}




$(document).ready(function () {
    initMap();
});
