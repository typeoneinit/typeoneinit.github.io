var orientDiv;
var motionDiv;
var gpsDiv;

var geoWatcherId = -1;

var curOrientationEvent = null;
var curMotionEvent = null;
var curGeoLocationEvent = null;


var deviceOrientationWatcher = function(event) {
    if (typeof event != "object") return ;
    //store event
    curOrientationEvent = event;
};

var deviceMotionWatcher = function(event) {
    if (typeof event != "object") return ;
    //store event
    curMotionEvent = event;
};

var geoWatcher = function(position) {
    if (typeof position != "object") return ;

    //store event
    curGeoLocationEvent = position; 
}

var geoErr = function(error) {
    gpsDiv.html(prettyPrint(error).innerHTML);
};

var IgniteTimeSeriesEvent = function() {
    this.versionCode = IGNITE_VERSION_CODE;
    this.type = null;
    this.startTime = new Date().getTime();
    this.endTime = new Date().getTime();
    this.recordCounts = 0;
    this.data = [];
};

//Time series events model
IgniteTimeSeriesEvent.prototype.addData = function(data) {
    if (data && typeof data == 'object') {
        this.data.push(data);
        this.recordCounts = this.data.length;
        this.type = data.type;        
    } else { // push null
        this.data.push(null);
    }

}

var IgniteSensorCollection = function() {
    this.hostname = window.location.hostname;
    this.userAgent = navigator.userAgent;
    this.orientation = new IgniteTimeSeriesEvent();
    this.motion = new IgniteTimeSeriesEvent();
    this.geoLocation = new IgniteTimeSeriesEvent();
}


//Orientation Event Model
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

//Motion Event Model
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

//Geo Location Event Model
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
var GeoLocationTSEvents = new IgniteTimeSeriesEvent();

