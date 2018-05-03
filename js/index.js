
$(document).ready(function(){
    //get element
    orientDiv = $("#orientation");
    motionDiv = $("#motion");
    gpsDiv = $("#gps");
    
    //set listeners
    
    //add gps listener
    if (navigator.geolocation) {
        gpsDiv.text("support navigator.geolocation")
        geoWatcherId = navigator.geolocation.watchPosition(geoWatcher, geoErr);
    } else {
        gpsDiv.text("not support gps");    
    }

});