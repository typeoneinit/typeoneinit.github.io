
$(document).ready(function(){
    //get element
    orientDiv = $("#orientation");
    motionDiv = $("#motion");
    gpsDiv = $("#gps");

    
    
    //set listeners
    
    //add gps listener
    if (navigator.geolocation) {
        gpsDiv.text("support navigator.geolocation")
        //geoWatcherId = navigator.geolocation.watchPosition(geoWatcher, geoErr, geoOption);
        rxjs.interval(1000).subscribe(
            x => navigator.geolocation.getCurrentPosition(geoWatcher, geoErr, geoOption)
        );
    } else {
        gpsDiv.text("not support gps");    
    }
});