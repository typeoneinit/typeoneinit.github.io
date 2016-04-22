var orientDiv;
var motionDiv;
var gpsDiv;

var geoWatcherId = -1;

var deviceOrientationWatcher = function(event) {
    var alpha = event.alpha;
    var beta = event.beta;
    var gamma = event.gamma;
    
    var outputString = "alpha: " + Math.round(alpha *10) / 10;
    outputString += "<br/>beta: " + Math.round(beta *10) / 10;  
    outputString += "<br/>gamma: " + Math.round(gamma *10) / 10;

    orientDiv.html(outputString+"");
};

var deviceMotionWatcher = function(event) {
    var accX = event.acceleration.x;
    var accY = event.acceleration.y;
    var accZ = event.acceleration.z;

    
    var outputString = "<br/>X: " + Math.round(accX *10) / 10;
    outputString += "<br/>Y: " + Math.round(accY *10) / 10;
    outputString += "<br/>Z: " + Math.round(accZ *10) / 10;

    motionDiv.html(outputString+"");
};

var geoWatcher = function(position) {
    var lat = position.coords.latitude;
    var lon = position.coords.longitude;
    var accuracy = position.coords.accuracy;
    var heading = position.coords.heading;
    var speed = position.coords.speed;
    var timeStamp = position.timestamp;

    var outputString = "<br/>WacherId: " + geoWatcherId;
    outputString += "<br/>Lat: " + lat;
    outputString += "<br/>Lon: " + lon;
    outputString += "<br/>accuracy: " + accuracy;
    outputString += "<br/>heading: " + heading;
    outputString += "<br/>speed: " + speed;
    outputString += "<br />time: " + new Date(timeStamp).customFormat(TIME_FORMAT);

    gpsDiv.html(outputString+"");
}

var geoErr = function(error) {
    switch(error.code) {
        case error.PERMISSION_DENIED:
            // Permission denied alert error message
            gpsDiv.text("no permission: " + error.message);
            break;
        case error.POSITION_UNAVAILABLE:
            gpsDiv.text("position unavailable: " + error.message);
            break;
        case error.TIMEOUT:
            gpsDiv.text("timeout: " + error.message);
            break;

        default:
        case error.UNKNOWN_ERROR:
            // Unknown error alert error message
            gpsDiv.text(error.message);
            break;        
    }
}

