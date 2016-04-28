
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

    var orientationLogger = setInterval(
        function(){
            OrientationTSEvents.addData(curOrientationEvent);
            // orientDiv.html(prettyPrint(curOrientationEvent).innerHTML + OrientationTSEvents.recordCounts);
        }, ONE_SECOND_MILLIS / MOTION_SAMPLE_RATE);
    var motionLogger = setInterval(
        function(){
            MotionTSEvents.addData(curMotionEvent);
            // motionDiv.html(prettyPrint(curMotionEvent).innerHTML + MotionTSEvents.recordCounts);
        }, ONE_SECOND_MILLIS / MOTION_SAMPLE_RATE);
    var geoLocationLogger = setInterval(
        function(){
            GeoLocationTSEvents.addData(curGeoLocationEvent);
            gpsDiv.html("lat: " + curGeoLocationEvent.coords.latitude + "<br />lon: "+ curGeoLocationEvent.coords.longitude);       
        }, ONE_SECOND_MILLIS / GEO_SAMPLE_RATE);

    var totalLogger = setInterval(
        function(){
            //TODO create a a better server data structure
            var data = new IgniteSensorCollection();
            data.orientation = OrientationTSEvents;
            data.motion = MotionTSEvents;
            data.geoLocation = GeoLocationTSEvents;

            //append client info
            data.hostname = window.location.hostname;
            data.userAgent = navigator.userAgent;

            //reset data
            OrientationTSEvents = new IgniteTimeSeriesEvent();
            OrientationTSEvents = new IgniteTimeSeriesEvent();
            OrientationTSEvents = new IgniteTimeSeriesEvent();

            //upload bufferd data
            // firebaseRef.set(data);
        }, 10000);
});