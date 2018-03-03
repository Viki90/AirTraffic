function isChecked(checkbox, submitButton) {
    console.log("SUBMIT1");
    console.log(submitButton);
    var button = document.getElementById(submitButton);
    if (checkbox.checked === true) {
        button.disabled = "";
    } else {
        button.disabled = "disabled";
    }
}

function getLocation(callback) {

    var options = {
      enableHighAccuracy: true,
      timeout: 10000,
      maximumAge: 0
    };
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(callback);
    }else{

    }
}

function getDataForGeolocation() {
    getLocation(function(pos){
    var crd = pos.coords;

    console.log('Your current position is:');
    console.log(`Latitude : ${crd.latitude}`);
    console.log(`Longitude: ${crd.longitude}`);
    console.log(`More or less ${crd.accuracy} meters.`);

    long = crd.longitude;
    lat = crd.latitude;
    $.ajax({
        url: "http://public-api.adsbexchange.com/VirtualRadar/AircraftList.json?lat=" + lat + "&lng=" + long,
        dataType: 'jsonp',
        error: function() {
            $('#message').html("<p>We couldn't retrive your data for your longitude and latitude. Please true again.</p>");
        },
        success: function(data){
            $('#message').html("<p>It is success.</p>")
             console.log("data");
        console.log(data);
        }

    });
});
};

function errorCallback(err) {
  $('#message').html("<p>We couldn't retrive your data for your longitude and latitude. Please true again.</p>");
};
