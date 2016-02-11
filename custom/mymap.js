/**
 * Created by Sazz on 12/19/2015.
 */

var map;
var initialLocation;
var home = {lat: 23.8, lng: 90.4};
var browserSupportFlag = new Boolean();
var geoCoder = null;
//var geoCoderInitialized = false;

var markers = [];
//var locations = ["banani, dhaka", "gulshan, dhaka", "dhanmondi, dhaka"];

function initMap() {

    if($('#map-container').is(':visible')){
        map = new google.maps.Map(document.getElementById('map-container'), {
            zoom: 14,
            center: home,
            mapTypeId: google.maps.MapTypeId.ROADMAP
        });
    }
    else if($('#map-container2').is(':visible')){
        map = new google.maps.Map(document.getElementById('map-container2'), {
            zoom: 14,
            center: home,
            mapTypeId: google.maps.MapTypeId.ROADMAP
        });
    }
    //map = new google.maps.Map(document.getElementById('map-container'), {
    //    zoom: 14,
    //    center: home,
    //    mapTypeId: google.maps.MapTypeId.ROADMAP
    //});

    if (navigator.geolocation) {
        browserSupportFlag = true;
        navigator.geolocation.getCurrentPosition(function (position) {
            initialLocation = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
            setUserLocation(position.coords.latitude, position.coords.longitude);
            //map.setCenter(initialLocation);
            setCurrentPlaceMarker(initialLocation, "You are here!");
            //initGeocoder();
            placeHospitals();
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

}

function initProfileMap() {

    map = new google.maps.Map(document.getElementById('map-container'), {
        zoom: 14,
        center: home,
        mapTypeId: google.maps.MapTypeId.ROADMAP
    });

    if (navigator.geolocation) {
        browserSupportFlag = true;
        navigator.geolocation.getCurrentPosition(function (position) {
            initialLocation = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
            setUserLocation(position.coords.latitude, position.coords.longitude);
            //map.setCenter(initialLocation);
            setCurrentPlaceMarker(initialLocation, "You are here!");
            //initGeocoder();
            placeHospitals();
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

}

function handleNoGeolocation(errorFlag) {
    if (errorFlag == true) {
        alert("Geolocation service failed. We've placed you in the center of Dhaka.");
                initialLocation = home;
    } else {
        alert("Your browser doesn't support geolocation. We've placed you in Dhaka.");
                initialLocation = home;
    }
}

function setCurrentPlaceMarker(currentPlace, text){
    var marker = new google.maps.Marker({
        position: currentPlace,
        title: text,
        label : text,
        icon: pinSymbol("#0DDC11")
    });
    marker.setMap(map);

    marker.info = new google.maps.InfoWindow({
        content: '<p><b>'+text+'</b></p> '
    });

    google.maps.event.addListener(marker, 'click', function() {
        marker.info.open(map, this);
    });
    markers.push(marker);
}

function placeMarkerAtHospital(hospital){
    var marker = new google.maps.Marker({
        position: {lat: hospital.lattitude, lng: hospital.longitude},
        title: hospital.name,
        label : hospital.name,
        icon: pinSymbol("#3B63EA")
    });
    marker.setMap(map);

    marker.info = new google.maps.InfoWindow({
        content: '<p><a><b>'+hospital.name+'</b></a></p> '
    });

    google.maps.event.addListener(marker, 'click', function() {
        marker.info.open(map, this);
    });

    markers.push(marker);
}

function fitAllMarkers(){
    var bounds = new google.maps.LatLngBounds();
    for(i=0;i<markers.length;i++) {
        bounds.extend(markers[i].getPosition());
    }
    map.fitBounds(bounds);
}

//function placeMarkerAtLocation(location, title, label, color, info1, info2){
//    var marker = new google.maps.Marker({
//        position: location,
//        title: title,
//        label : label,
//        icon: pinSymbol(color)
//        // icon : 'http://maps.google.com/mapfiles/ms/icons/blue-dot.png'
//    });
//    marker.setMap(map);
//
//    marker.info = new google.maps.InfoWindow({
//        content: '<p><a href="www.google.com"><b>'+info1+'</b></a></p> '+
//                    '<p>'+info2+'</p>'
//    });
//
//    google.maps.event.addListener(marker, 'click', function() {
//        marker.info.open(map, this);
//    });
//}

// geocode test
//function initGeocoder(){
//    geoCoder = new google.maps.Geocoder();
//    geoCoderInitialized = true;
//}

//function geoCode(item, placeMarkerFlag){
//
//    if(geoCoder){
//        geoCoder.geocode({address : item.location}, function(results, status)
//        {
//            if (status == google.maps.GeocoderStatus.OK)
//            {
//                var distance = getDistance(initialLocation, results[0].geometry.location);
//                console.log(results[0].formatted_address+' - '+ distance);
//                if(placeMarkerFlag){
//                    placeMarkerAtLocation(results[0].geometry.location, results[0].formatted_address, 'This is a label',
//                        "#3B63EA", item.name, item.hospitalName);
//                }
//
//            } else {
//              alert('Geocode was not successful for the following reason: ' + status);
//            }
//        });
//    }
//
//}

function pinSymbol(color) {
    return {
        path: 'M 0,0 C -2,-20 -10,-22 -10,-30 A 10,10 0 1,1 10,-30 C 10,-22 2,-20 0,0 z M -2,-30 a 2,2 0 1,1 4,0 2,2 0 1,1 -4,0',
        fillColor: color,
        fillOpacity: 0.8,
        strokeColor: '#000000',
        strokeWeight: 1,
        scale: 1
   };
}

// geocode test

// measuring distance
//var rad = function(x) {
//  return x * Math.PI / 180;
//};
//
//var getDistance = function(p1, p2) {
//  var R = 6378137; // Earth’s mean radius in meter
//  var dLat = rad(p2.lat() - p1.lat());
//  var dLong = rad(p2.lng() - p1.lng());
//  var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
//    Math.cos(rad(p1.lat())) * Math.cos(rad(p2.lat())) *
//    Math.sin(dLong / 2) * Math.sin(dLong / 2);
//  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
//  var d = R * c;
//  return d; // returns the distance in meter
//};

function getUserLocation(){
    if (navigator.geolocation) {
        browserSupportFlag = true;
        navigator.geolocation.getCurrentPosition(function (position) {
            setUserLocation(position.coords.latitude, position.coords.longitude);
        }, function () {
            handleNoGeolocation(browserSupportFlag);
            setUserLocation(home.lat, home.lng);
        });
    }
    // Browser doesn't support Geolocation
    else {
        browserSupportFlag = false;
        handleNoGeolocation(browserSupportFlag);
    }
}