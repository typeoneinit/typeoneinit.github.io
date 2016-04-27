var orientDiv;
var motionDiv;
var gpsDiv;

var geoWatcherId = -1;

var deviceOrientationWatcher = function(event) {
    OrientationTSEvents.addData(new OrientationEvent(event));

    //print logs
    event.counts = OrientationTSEvents.recordCounts;
    orientDiv.html(prettyPrint(event).innerHTML);

};

var deviceMotionWatcher = function(event) {
    MotionTSEvents.addData(new MotionEvent(event));

    //print logs
    event.count = MotionTSEvents.recordCounts;
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
    outputString += "<br />counts: " + GeoTSEvents.recordCounts;


    GeoTSEvents.addData(new GeoLocationEvent(position));
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
    this.versionCode = IGNITE_VERSION_CODE;
    this.type = null;
    this.startTime = new Date().getTime();
    this.endTime = new Date().getTime();
    this.recordCounts = 0;
    this.data = [];
};

IgniteTimeSeriesEvent.prototype.addData = function(data) {
    this.data.push(data);
    this.recordCounts = this.data.length;
    this.type = data.type;
}


var OrientationEvent = function(event) {
    this.type = "OrientationEvent";
    this.timeMillis = new Date().getTime();

    if (event && event instanceof Object ) {
        this.alpha = event.alpha;
        this.beta = event.beta ;
        this.gamma = event.gamma;
        this.webkitCompassHeding = event.webkitCompassHeading;
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
    this.type = "MotionEvent";
    this.timeMillis = new Date().getTime();

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
    this.type = "GeoLocationEvent";
    this.timeMillis = new Date().getTime();

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


var OrientationTSEvents = new IgniteTimeSeriesEvent();
var MotionTSEvents = new IgniteTimeSeriesEvent();
var GeoTSEvents = new IgniteTimeSeriesEvent();