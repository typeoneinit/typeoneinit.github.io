
var geoWatcher = function(position) {
    this.geoWatcherId = -1;
    this.log = "";
    this.pre;

    this.log += "lat: " + position.coords.latitude;
    this.log += "<br />lon: " + position.coords.longitude;

    
    if (this.pre) {
        this.log +="<br /> pre lat: " + this.pre.coords.latitude;
        this.log +="<br /> pre lon: " + this.pre.coords.longitude;
        this.dPos = getDistanceFromLatLng(
            position.coords.latitude, 
            position.coords.longitude,
            this.pre.coords.latitude,
            this.pre.coords.longitude);

        this.dT = (position.timestamp - this.pre.timestamp) / 1000;
        this.kmh = this.dPos / this.dT * 3600;

        this.log +="<br /> distance: " + getReadableDistance(dPos);
        this.log += "<br /> time: " + this.dT;
        this.log += "<br /> v: " + getReadableVelocity(this.kmh);
    }
    this.log += "<br />speed: " + position.coords.speed;
    this.log += "<br />accuracy: " + position.coords.accuracy;
    this.log += "<br />heading: " + position.coords.heading;
    this.log += "<br />time: " + position.timestamp;
    this.pre = position;
    GeoLocationTSEvents.addData(new GeoLocationEvent(position));
    gpsDiv.html(this.log);
}

var geoErr = function(error) {
    gpsDiv.html("error: " + error.code);
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