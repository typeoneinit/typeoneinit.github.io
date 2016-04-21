var GPS_UNKNOWN_ERROR = 0;
var GPS_PERMISSION_DENIED = 1;
var GPS_POSITION_UNAVAILABLE = 2;
var GPS_TIMEOUT = 3;

var orientDiv;
var motionDiv;
var gpsDiv;



$(document).ready(function(){
    //get element
    orientDiv = $("#orientation");
    motionDiv = $("#motion");
    gpsDiv = $("#gps");
    
    
    //set listeners
    if (window.DeviceOrientationEvent) {
        orientDiv.text("init...");
        window.addEventListener('deviceorientation', function(event){
            var alpha = event.alpha;
            var beta = event.beta;
            var gamma = event.gamma;
            

            
            var outputString = "alpha: " + Math.round(alpha *10) / 10;
            outputString += "<br/>beta: " + Math.round(beta *10) / 10;  
            outputString += "<br/>gamma: " + Math.round(gamma *10) / 10;

            orientDiv.html(outputString+"");
            
        },false);

    } else {
        orientDiv.text("not support gyro");
    }


    //add motion listener
    if (window.DeviceMotionEvent) {
        motionDiv.text("init...");
        window.addEventListener('devicemotion', function(event){
            var accX = event.acceleration.x;
            var accY = event.acceleration.y;
            var accZ = event.acceleration.z;

            
            var outputString = "<br/>X: " + Math.round(accX *10) / 10;
            outputString += "<br/>Y: " + Math.round(accY *10) / 10;
            outputString += "<br/>Z: " + Math.round(accZ *10) / 10;

            motionDiv.html(outputString+"");
            
        },false);

    } else {
        motionDiv.text("not support accelemeter");
    }
    
    //add gps listener
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position){
            var lat = position.coords.latitude;
            var lon = position.coords.longitude;
            var accuracy = position.coords.accuracy;
            var heading = position.coords.heading;
            var speed = position.coords.speed;

            var outputString = "<br/>Lat: " + Math.round(lat *1000) / 1000;
            outputString += "<br/>Lon: " + Math.round(lon *1000) / 1000;
            outputString += "<br/>accuracy: " + accuracy;
            outputString += "<br/>heading: " + heading;
            outputString += "<br/>speed: " + speed;

            gpsDiv.html(outputString+"");
        },
        function(error) {
        	switch(error.code) { // Returns 0-3 
	            case GPS_UNKNOWN_ERROR:
		            // Unknown error alert error message
		            gpsDiv.text(error.message);
		            break;

	            case GPS_PERMISSION_DENIED:
		            // Permission denied alert error message
		            gpsDiv.text("no permission: " + error.message);
		            break;
                case GPS_POSITION_UNAVAILABLE:
		            gpsDiv.text("position unavailable: " + error.message);
                    break;
                case TIMEOUT:
		            gpsDiv.text("timeout: " + error.message);
                    break;
                default:
	            case GPS_UNKNOW_ERROR:
		            // Unknown error alert error message
		            gpsDiv.text("gg:" + error.message);
		            break;
                    
                
            }
        });

    } else {
        gpsDiv.text("not support gps");    
    }
    

});
