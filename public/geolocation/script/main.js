function ping() {
    alert("ping!");
}

function upload() {
    //Get the photo from the input form
    var input = document.getElementById('files');
    var files = input.files;
    if (files.length != 1) { exit; }

    var file = files[0];
    var reader = new FileReader; // use HTML5 file reader to get the file

    var img = document.createElement("IMG");
    reader.onload = function(e){
        img.setAttribute("src",reader.result);

        EXIF.getData(img, function() {
            console.log(EXIF.pretty(img));

            var lat = EXIF.getTag(this,"GPSLatitude") || [0,0,0];
            var lon = EXIF.getTag(this,"GPSLongitude")|| [0,0,0];

            //Convert coordinates to WGS84 decimal
            var latRef = EXIF.getTag(this,"GPSLatitudeRef") || "N";  
            var lonRef = EXIF.getTag(this,"GPSLongitudeRef") || "W";  
            lat = (lat[0] + lat[1]/60 + lat[2]/3600) * (latRef == "N" ? 1 : -1);  
            lon = (lon[0] + lon[1]/60 + lon[2]/3600) * (lonRef == "W" ? -1 : 1); 

            //Send the coordinates to your map
            setGeotagFields(lat,lon,EXIF.pretty(img));
        });
    };
    reader.readAsDataURL(file);

}

function setGeotagFields(lat, lon, geodata) {
    document.getElementById('lat').value = lat;
    document.getElementById('lon').value = lon;
    document.getElementById('geodata').value = geodata;

    var location = {lat: lat, lng: lon};

    initMap(location);
}

function initMap(location) {
    //var cambridge = {lat: 52.205, lng: 0.119}; 
    //location = {lat: 52.205, lng: 0.119}; 
    var map = new google.maps.Map(document.getElementById('map'), {
        zoom: 8,
        center: location
    });
    var marker = new google.maps.Marker({
        position: location,
        map: map
    });
}