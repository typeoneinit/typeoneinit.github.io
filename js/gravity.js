var div;



$(document).ready(function(){
    //get element
    div = $("#div");
    
    //alert if no div
    if (!div) alert('cannot find div');   

    //set listeners
    if (window.DeviceOrientationEvent) {
        window.addEventListener('deviceorientation', function(event){
            var alpha = event.alpha;
            var beta = evnt.beta;
            var gamma = event.gamma;
            
            var outputString = "alpha: " + alpha;
            outputString += "<br/>beta: " + beta;  
            outputString += "<br/>gamma: " + gamma;

            div.text("");
            
        },false);

    }
    

});
