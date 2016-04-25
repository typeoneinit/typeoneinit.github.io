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

    orientDiv.html(prettyPrint(event).innerHTML);
};

var deviceMotionWatcher = function(event) {
    var accX = event.acceleration.x;
    var accY = event.acceleration.y;
    var accZ = event.acceleration.z;

    var accXp = event.accelerationIncludingGravity.x;
    var accYp = event.accelerationIncludingGravity.y;
    var accZp = event.accelerationIncludingGravity.z;

    var rAlhpha = event.rotationRate.alpha;
    var rGamma = event.rotationRate.alpha;
    var rAlhpha = event.rotationRate.alpha;

    
    var outputString = "<br/>X: " + Math.round(accX *10) / 10;
    outputString += "<br/>Y: " + Math.round(accY *10) / 10;
    outputString += "<br/>Z: " + Math.round(accZ *10) / 10;
    outputString += "<br/>Xp: " + Math.round(accXp *10) / 10;
    outputString += "<br/>Yp: " + Math.round(accYp *10) / 10;
    outputString += "<br/>Zp: " + Math.round(accZp *10) / 10;

    motionDiv.html(prettyPrint(event).innerHTML);
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

    var p = new GeoLocationEvent(position);

    try {
        if (position.coords.latitude) {
            gpsDiv.html(prettyPrint(position).innerHTML + outputString);                    
        } else {
            gpsDiv.html("no data");
        }
            // gpsDiv.html(outputString);
        

    } catch (err) {
        gpsDiv.html(err.message);
    }

}

var geoErr = function(error) {
    gpsDiv.html(prettyPrint(error).innerHTML);
    // switch(error.code) {
    //     case error.PERMISSION_DENIED:
    //         // Permission denied alert error message
    //         gpsDiv.html("no permission: " + error.message);
    //         break;
    //     case error.POSITION_UNAVAILABLE:
    //         gpsDiv.html("position unavailable: " + error.message);
    //         break;
    //     case error.TIMEOUT:
    //         gpsDiv.html("timeout: " + error.message);
    //         break;

    //     default:
    //     case error.UNKNOWN_ERROR:
    //         // Unknown error alert error message
    //         gpsDiv.html(error.message);
    //         break;        
    // }
};

var IgniteTimeSeriesEvent = function() {
    this.versionCode = "1";
    this.header = function() {
        this.startTime = new Date().getTime();
        this.endTime = new Date().getTime();
        this.recordCounts = 0;
    };

    this.data = [];

};

IgniteTimeSeriesEvent.prototype.addData = function() {

}

var IgniteEvent = function() {

    this.OrientationEvent = function() {

    };

    this.MotionEvent = function() {

    };

    this.GeoLocationEvent = function() {

    };
};

var OrientationEvent = function(event) {


    if (event && event instanceof Object ) {
        this.alpha = event.alpha;
        this.beta = event.beta ;
        this.gamma = event.gamma;
        this.webkitCompassHeading = event.webkitCompassHeading;
        this.webkitCompassaccurarcy = event.webkitCompassaccurarcy;
    } else {
        this.alpha = 0;
        this.beta = 0;
        this.gamma = 0;
        this.webkitCompassHeading = 0;
        this.webkitCompassaccurarcy = 0;        
    }

};

var MotionEvent = function(event) {


    if (event && event instanceof Object ) {
        this.acceleration = {};
        this.acceleration.x = 0;
        this.acceleration.y = 0;
        this.acceleration.z =0;

        this.accelerationIncludingGravity = {};
        this.accelerationIncludingGravity.x = 0;
        this.accelerationIncludingGravity.y = 0;
        this.accelerationIncludingGravity.z = -9.8;

        this.rotationRate = {};

        this.rotationRate.alpha = 0;
        this.rotationRate.beta = 0;
        this.rotationRate.gamma = 0;

    } else {

        this.acceleration = {};
        this.acceleration.x = 0;
        this.acceleration.y = 0;
        this.acceleration.z =0;

        this.accelerationIncludingGravity = {};
        this.accelerationIncludingGravity.x = 0;
        this.accelerationIncludingGravity.y = 0;
        this.accelerationIncludingGravity.z = -9.8;

        this.rotationRate = {};

        this.rotationRate.alpha = 0;
        this.rotationRate.beta = 0;
        this.rotationRate.gamma = 0;
        
        this.interval = 0;
    }

};

var GeoLocationEvent = function(position) {

    if (position && position instanceof Object ) {

        this.coords = {};
        this.coords.latitude = position.coords.latitude;
        this.coords.longitude = position.coords.longitude;
        this.coords.altitude = position.coords.altitude;
        this.coords.altitudeAccuracy = position.coords.altitudeAccuracy;
        this.coords.accuracy = position.coords.accuracy;
        this.coords.heading = position.coords.heading;
        this.coords.speed = position.coords.speed;
        this.timestamp = position.timestamp;
    } else {

        this.coords = {};
        this.coords.latitude = 0;
        this.coords.longitude = 0;
        this.coords.altitude = 0;
        this.coords.altitudeAccuracy = 0;
        this.coords.accuracy = 0;
        this.coords.heading = null;
        this.coords.speed = null;
        this.timestamp = new Date().getTime();
    }

};
