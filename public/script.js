var mymap = L.map('mapid').setView([51.505, -0.09], 13);

L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
    maxZoom: 18,
    id: 'shiftyshofner.okh88o37',
    accessToken: 'pk.eyJ1Ijoic2hpZnR5c2hvZm5lciIsImEiOiJjaW95amQ2eGowMXZudWZtNGh1dnZ0Z3F3In0.hsRaBxa8sODVT3Sl50E6cQ'
}).addTo(mymap);
