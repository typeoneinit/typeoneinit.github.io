//app related info
var IGNITE_VERSION_CODE = 1;
var IGNITE_VERSION_NAME = "alpha_01"

//firebase server params
var IGNITE_DEBUG_APP_URL = "https://ignite-alpha.firebaseio.com/";
var IGNITE_PRODUCTION_APP_URL = "";

//firbase nodes
var IGNITE_USER_NODE = "user/";
var IGNITE_ORIENTATION_NODE = "orientation/";
var IGNITE_MOTION_NODE = "motion/";
var IGNITE_GEOLOCATION_NODE = "geolocation/";

//local cookie keys
var COOKIE_USER_HASH = "COOKIE_USER_HASH";


//time format
var TIME_FORMAT = "#YYYY#-#MM#-#DD# #hh#:#mm#:#ss#";

//sensor params
var ONE_SECOND_MILLIS = 1000;
var MOTION_SAMPLE_RATE = 10; //10 times per second
var GEO_SAMPLE_RATE = 1; //once per sec


//backend Objects
var userNode = new Firebase(IGNITE_DEBUG_APP_URL + IGNITE_USER_NODE);
var orientationNode = new Firebase(IGNITE_DEBUG_APP_URL + IGNITE_ORIENTATION_NODE);
var motionNode = new Firebase(IGNITE_DEBUG_APP_URL + IGNITE_MOTION_NODE);
var geoLocationNode = new Firebase(IGNITE_DEBUG_APP_URL + IGNITE_GEOLOCATION_NODE);

//*** This code is copyright 2002-2003 by Gavin Kistner, !@phrogz.net
//*** It is covered under the license viewable at http://phrogz.net/JS/_ReuseLicense.txt
Date.prototype.customFormat = function(formatString){
  var YYYY,YY,MMMM,MMM,MM,M,DDDD,DDD,DD,D,hhhh,hhh,hh,h,mm,m,ss,s,ampm,AMPM,dMod,th;
  YY = ((YYYY=this.getFullYear())+"").slice(-2);
  MM = (M=this.getMonth()+1)<10?('0'+M):M;
  MMM = (MMMM=["January","February","March","April","May","June","July","August","September","October","November","December"][M-1]).substring(0,3);
  DD = (D=this.getDate())<10?('0'+D):D;
  DDD = (DDDD=["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"][this.getDay()]).substring(0,3);
  th=(D>=10&&D<=20)?'th':((dMod=D%10)==1)?'st':(dMod==2)?'nd':(dMod==3)?'rd':'th';
  formatString = formatString.replace("#YYYY#",YYYY).replace("#YY#",YY).replace("#MMMM#",MMMM).replace("#MMM#",MMM).replace("#MM#",MM).replace("#M#",M).replace("#DDDD#",DDDD).replace("#DDD#",DDD).replace("#DD#",DD).replace("#D#",D).replace("#th#",th);
  h=(hhh=this.getHours());
  if (h==0) h=24;
  if (h>12) h-=12;
  hh = h<10?('0'+h):h;
  hhhh = h<10?('0'+hhh):hhh;
  AMPM=(ampm=hhh<12?'am':'pm').toUpperCase();
  mm=(m=this.getMinutes())<10?('0'+m):m;
  ss=(s=this.getSeconds())<10?('0'+s):s;
  return formatString.replace("h#hhh#",hhhh).replace("#hhh#",hhh).replace("#hh#",hh).replace("#h#",h).replace("#mm#",mm).replace("#m#",m).replace("#ss#",ss).replace("#s#",s).replace("#ampm#",ampm).replace("#AMPM#",AMPM);
};

