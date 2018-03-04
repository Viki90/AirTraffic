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
                $('#message').html("<p>It is success.</p>");
             
                //console.log(data)
                var listToShow = [];
                var listAlt = [];
                for(var i = 0; i < data.acList.length; i++){
                    //console.log(data.acList[i].length)
                    //console.log("Alt");
                    //console.log(data.acList[i].Alt);
                    //console.log("Alt");
                    //console.log("Year");
                    //console.log(data.acList[i].Year);
                    if(i < 9){
                        listToShow.push(data.acList[i]);
                    }else{
                        listToShow.sort(function(a, b){
                            return b.Alt - a.Alt;
                        });
                       // for(var i = 0; i < listToShow.length; i++){
                           
                            listOfFlights(listToShow);
                        //}

                        break;
                    }

                }
            }
        });
    });
}

function errorCallback(err) {
  $('#message').html("<p>We couldn't retrive your data for your longitude and latitude. Please true again.</p>");
};

function listOfFlights(listToShow){
    $('#list').append('<h2>Flights:</h2>');
    for (var i = 0; i < listToShow.length; i++) {
         $('#list').append('<ul><li>Flight code: '+ listToShow[i].Id +'</li>' + 
                            '<li>Altitude: ' + listToShow[i].Alt + '</li>' +
                            '<li>Destination: ' + listToShow[i].Cou + '</li></ul>');
    }

    
    
}
