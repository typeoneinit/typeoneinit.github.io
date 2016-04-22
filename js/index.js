
$(document).ready(function(){
    //get element
    orientDiv = $("#orientation");
    motionDiv = $("#motion");
    gpsDiv = $("#gps");
    

    
    //set listeners
    if (window.DeviceOrientationEvent) {
        window.addEventListener('deviceorientation', deviceOrientationWatcher, false);
    } else {
        orientDiv.text("not support gyro");
    }


    //add motion listener
    if (window.DeviceMotionEvent) {
        motionDiv.text("init...");
        window.addEventListener('devicemotion', deviceMotionWatcher, false);
    } else {
        motionDiv.text("not support accelemeter");
    }
    
    //add gps listener
    if (navigator.geolocation) {
        geoWatcherId = navigator.geolocation.watchPosition(geoWatcher, geoErr);
    } else {
        gpsDiv.text("not support gps");    
    }

});
