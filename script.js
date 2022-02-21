// function getRandomLatLng(map) {
//     // get the boundaries of the map
//     let bounds = map.getBounds();
//     // get the upper right and lower left of the map window
//     // in lat lng
//     let southwest = bounds.getSouthWest();
//     let northeast = bounds.getNorthEast();
//     // we calculate the length and width of the map window in lat,lng   
//     let lngSpan = northeast.lng - southwest.lng;
//     let latSpan = northeast.lat - southwest.lat;
//     let randomLng = (Math.random() * lngSpan) + southwest.lng;
//     let randomLat = (Math.random() * latSpan) + southwest.lat;
//     return [randomLat, randomLng];
// }
// we need a center position for our map
// to be the starting position
let singapore = [1.29, 103.85]; // <-- array of 
// 2 elements for latm lng
// create the map
// L is the Leaflet object which is in the global scope
// and is created when we <script src="leaflet.js">...
// L.map() creates a map object (contains all functionalities/data)
// and it takes one arg: the ID to put the map in.
let binMap = L.map('singaporeMap', {
    center: singapore,
    zoom: 15
});

// setup the tile layers
// this setup the drawing of the map
// L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
//     attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
//     maxZoom: 18,
//     id: 'mapbox/streets-v11',
//     tileSize: 512,
//     zoomOffset: -1,
//     accessToken: 'pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw' //demo access token
// }).addTo(binMap);
// L.tileLayer('http://{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}', {
//     maxZoom: 20,
//     subdomains: ['mt0', 'mt1', 'mt2', 'mt3']
// })


var basemap = L.tileLayer('https://maps-{s}.onemap.sg/v3/Default/{z}/{x}/{y}.png', {
    detectRetina: true,
    maxZoom: 19,
    minZoom: 5,
    //Do not remove this attribution
    attribution: '<img src="https://docs.onemap.gov.sg/maps/images/oneMap64-01.png" style="height:40px;width:40px;"/> OneMap | Map data &copy; contributors, <a href="http://SLA.gov.sg">Singapore Land Authority</a>'
}).addTo(binMap);

// template icon for dustbin
var DustbinBigIcon = L.Icon.extend({
    options: {
        iconSize: [20, 20],
        iconAnchor: [20, 0],
        popupAnchor: [0, 0]
    }
});

var DustbinIcon = L.Icon.extend({
    options: {
        iconSize: [17, 17],
        iconAnchor: [7.5, 0],
        popupAnchor: [0, 0]
    }
});

const clusterConfig = {
    spiderfyOnMaxZoom: false,
    disableClusteringAtZoom: 17
};

let commonRecycleLayer = L.markerClusterGroup(clusterConfig);
let lightingLayer = L.markerClusterGroup(clusterConfig);
let secondHandLayer = L.markerClusterGroup(clusterConfig);
let eWasteLayer = L.markerClusterGroup(clusterConfig);
// let eWasteAlbaSubLayer = L.featureGroup.subGroup(eWasteLayer)
// let eWasteInkSubLayer = L.featureGroup.subGroup(eWasteLayer)
let baselays = {
    'Common': commonRecycleLayer
}
let overlays = {
    'Lighting': lightingLayer,
    'Second hand': secondHandLayer,
    'E-Waste': eWasteLayer
}

document.querySelector('#btnToggle')
    .addEventListener('click', function() {
        // // if the map already has group3 layer, remove it
        // if (map.hasLayer(secondHandLayer)) {
        //     map.removeLayer(secondHandLayer);
        // } else {
        //     // if the map does not have the group3 layer, add it
        //     map.addLayer(secondHandLayer);
        // }
        if (binMap.hasLayer(commonRecycleLayer)) {
            binMap.removeLayer(commonRecycleLayer);
        } else {
            binMap.addLayer(commonRecycleLayer);
        }
    })

L.control.layers(baselays, overlays).addTo(binMap);



async function ewaste3() {
    let response = await axios.get("data/lighting-waste.geojson");
    // console.log(response)

    let ewaste = L.geoJson(response.data, {
        onEachFeature:function(feature, layer) {
            // layer.bindPopup(feature.properties.Description);
            let dummyDiv = document.createElement('div');
            dummyDiv.innerHTML = feature.properties.Description;
            let columns = dummyDiv.querySelectorAll('td');
            let description = columns[3].innerHTML;
            let bname = columns[4].innerHTML;
            let blk = columns[7].innerHTML;
            let stname = columns[12].innerHTML;
            let unit = columns[5].innerHTML;
            let postal = columns[2].innerHTML;
            layer.bindPopup(`<div>
                
                    Description: ${description}<br>
                    Building Name: ${bname}<br>
                    Blk: ${blk}<br>
                    Street Name: ${stname}<br>
                    Unit: ${unit}<br>
                    Postal: ${postal}<br>
                
            </div>`)
        }
    }).addTo(lightingLayer);
   
    return ewaste;
}
//     return response.data.features;
// }


// let companyType = [];
// let markerList = [];

window.addEventListener("DOMContentLoaded", async function() {
    // wait for getTaxi to finish and then store its return value
    // into taxiCoordinates
    let light_loc = await ewaste3();

    for (let i of light_loc) {
        // each t is an array
        // element 0 is lng, element 1 is lat
        let lat = i.geometry.coordinates[1];
        let lng = i.geometry.coordinates[0];

        // console.log(lat);
        // console.log(lng);

       

        let marker = L.marker([lat, lng]);
        marker.addTo(lightingLayer);

    }
    lightingLayer.addTo(binMap);
});

async function ewaste2() {
    let response = await axios.get("data/2ndhand.geojson");
    // console.log(response)

    let secondhand = L.geoJson(response.data, {
        onEachFeature:function(feature, layer) {
            // layer.bindPopup(feature.properties.Description);
            let dummyDiv = document.createElement('div');
            dummyDiv.innerHTML = feature.properties.description;
            let columns = dummyDiv.querySelectorAll('td');
            let description = columns[3].innerHTML;
            let bname = columns[4].innerHTML;
            let stname = columns[12].innerHTML;
            let blk = columns[7].innerHTML;
            let unit = columns[5].innerHTML;
            let postal = columns[2].innerHTML;
            layer.bindPopup(`<div>
                
                    Description: ${description}<br>
                    Building Name: ${bname}<br>
                    Street Name: ${stname}<br>
                    Blk: ${blk}<br>
                    Unit: ${unit}<br>
                    Postal: ${postal}<br>
                
            </div>`)
        }
    }).addTo(secondHandLayer);
   
    return secondhand;
}

window.addEventListener("DOMContentLoaded", async function() {
    // wait for getTaxi to finish and then store its return value
    // into taxiCoordinates
    let sechand_loc = await ewaste2();
    for (let l of sechand_loc) {
        // each t is an array
        // element 0 is lng, element 1 is lat
        let lat = l.geometry.coordinates[1];
        let lng = l.geometry.coordinates[0];

        // console.log(lat);
        // console.log(lng);

        let marker = L.marker([lat, lng]);
        marker.addTo(secondHandLayer);
    }
    secondHandLayer.addTo(binMap);
});



async function ewaste1() {
    let response = await axios.get("data/recycling.geojson");
    // console.log(response)
    let orirecycle = L.geoJson(response.data, {
        onEachFeature:function(feature, layer) {
            // layer.bindPopup(feature.properties.Description);
            let dummyDiv = document.createElement('div');
            dummyDiv.innerHTML = feature.properties.description;
            let columns = dummyDiv.querySelectorAll('td');
            let description = columns[25].innerHTML;
            let collection = columns[17].innerHTML;
            let blk = columns[5].innerHTML;
            let unit = columns[9].innerHTML;
            let stname= columns[13].innerHTML;
            let postal = columns[11].innerHTML;
            layer.bindPopup(`<div class = "recycle">
                
                    Description: ${description}<br>
                    Collection: ${collection}<br>
                    Blk: ${blk}<br>
                    Unit: ${unit}<br>
                    Street name: ${stname}<br>
                    Postal: ${postal}<br>
                
            </div>`)
        }
    }).addTo(commonRecycleLayer);
   
    return orirecycle;
}

window.addEventListener("DOMContentLoaded", async function() {
    // wait for getTaxi to finish and then store its return value
    // into taxiCoordinates
    let recycle_loc = await ewaste1();
    console.log("Recycle:", recycle_loc);
    for (let p of recycle_loc) {
        // each t is an array
        // element 0 is lng, element 1 is lat
        let lat = p.geometry.coordinates[1];
        let lng = p.geometry.coordinates[0];

        // console.log(lat);
        // console.log(lng);

        let marker = L.marker([lat, lng]);
        marker.addTo(commonRecycleLayer);
    }
    commonRecycleLayer.addTo(binMap);

});



async function ewaste() {
    let response = await axios.get("data/ewaste-recycle.geojson");
    // console.log(response)
    return response.data.features;
}

let binData = [];
let companyType = [];
let markerList = [];
// let layerGroupAlba; 
// let layerGroup; 
window.addEventListener("DOMContentLoaded", async function() {
    // wait for getTaxi to finish and then store its return value
    // into taxiCoordinates
    let ewaste_data = await ewaste();
    console.log(ewaste_data);

    for (let d of ewaste_data) {
        // each t is an array
        // element 0 is lng, element 1 is lat
        let lat = d.geometry.coordinates[1];
        let lng = d.geometry.coordinates[0];
        /*
        <div>
        <center>
        <table>
        <tr><th colspan='2' align='center'><em>Attributes</em></th></tr><tr bgcolor="#E3E3F3"> <th>NAME</th> 
        <td>NEA Producer Responsibility Scheme - ALBA E-waste Recycling Programme</td></tr> 0
        <tr bgcolor=""> <th>LANDXADDRESSPOINT</th> <td></td> </tr> 1
        <tr bgcolor="#E3E3F3"> <th>PHOTOURL</th> <td></td> </tr> 2
        <tr bgcolor=""> <th>ADDRESSPOSTALCODE</th> <td>608549</td> </tr> 3
        <tr bgcolor="#E3E3F3"> <th>LANDYADDRESSPOINT</th> <td></td> </tr> 4
        <tr bgcolor=""> <th>HYPERLINK</th> <td>https://alba-ewaste.sg; https://go.gov.sg/e-waste</td> </tr> 5
        <tr bgcolor="#E3E3F3"> <th>ADDRESSUNITNUMBER</th> <td></td> </tr> 6
        <tr bgcolor=""> <th>ADDRESSFLOORNUMBER</th> <td></td> </tr> 7
        <tr bgcolor="#E3E3F3"> <th>ADDRESSBUILDINGNAME</th> <td>COURTS @ JEM</td> </tr> 8
        <tr bgcolor=""> <th>ADDRESSBLOCKHOUSENUMBER</th> <td></td> </tr> 9
        <tr bgcolor="#E3E3F3"> <th>ADDRESSSTREETNAME</th> <td>50 JURONG GATEWAY ROAD, JEM, #04-30</td> </tr> 10
        <tr bgcolor=""> <th>DESCRIPTION</th> <td>Bin collection; E-waste accepted: ICT equipment, Batteries and Lamps only</td> </tr> 11
        <tr bgcolor="#E3E3F3"> <th>INC_CRC</th> <td>F0F20CDE76F503E4</td> </tr> 12
        <tr bgcolor=""> <th>FMEL_UPD_D</th> <td>20210920165422</td> </tr> 13
        </table>
        </center>
        </div>
        */

        let dummyDiv = document.createElement('div');
        dummyDiv.innerHTML = d.properties.Description;
        let columns = dummyDiv.querySelectorAll('td');
        let binName = columns[0].innerHTML;
        let binCollectData = columns[11].innerHTML.split(";"); // xxxx; waste: abc, 123,
        let binCollectMethod = binCollectData[0];
        let binCollectItemTypes = binCollectData[1].split(":")[1];
        let binPlaceName = columns[8].innerHTML;
        let binAddress = columns[10].innerHTML;
        let binPostal = columns[3].innerHTML;
        let binInfo = {
            name: binName,
            method: binCollectMethod,
            collect: binCollectItemTypes,
            place: binPlaceName,
            address: binAddress,
            postal: binPostal,
            geodata: [lat, lng]
        }
        binData.push(binInfo);
        //ternary check
        let iconType = (binName.indexOf("ALBA") != -1) ? "images/alba.png" : "images/ink.png";
        // let iconShadowType = (binCollectMethod.indexOf("Bin")!= -1)?"images/vehiclecollect.png":"images/mancollect.png";
        let marker = L.marker([lat, lng], { icon: new DustbinBigIcon({ iconUrl: iconType }) });
        marker.properties = binInfo;
        marker.bindPopup(`<div>
            
                Name: ${binName}<br>
                Method: ${binCollectMethod}<br> 
                Collect: ${binCollectItemTypes}<br>
                Place: ${binPlaceName}<br>
                Address: ${binAddress}<br>
                Postal: ${binPostal}<br>
            
        </div>`)

        // console.log(lng);


        //marker.addTo(binMap);
        //markerList.push(marker);
        // if (binName.indexOf("ALBA") != -1) {
        //     marker.addTo(eWasteAlbaSubLayer);
        // } else {
        //     marker.addTo(eWasteInkSubLayer);
        // }
        marker.addTo(eWasteLayer);

    }
    eWasteLayer.addTo(binMap);

    //console.log(binData)

    // let nameList = []
    // let collectList = []
    // for(let binInfo of binData){
    //     if(nameList.indexOf(binInfo.name) == -1){
    //         nameList.push(binInfo.name);
    //     }

    //     if(collectList.indexOf(binInfo.collect) == -1){
    //         collectList.push(binInfo.collect);
    //     }
    // }

    // console.log(binData);
    //console.log(collectList);
    //markerClusterLayer.addTo(map);
});










let showCluster = false;
document.querySelector('#toggle-cluster-btn').addEventListener('click', () => {
    showCluster = !showCluster;
    if (showCluster) {

    } else {

    }
});

document.querySelector('#contactButton').addEventListener('click', () => {

});






// window.addEventListener("DOMContentLoaded", async function(){
//     // wait for getTaxi to finish and then store its return value
//     // into taxiCoordinates
//     let quakearray = await quake();
//     // let markerClusterLayer = L.markerClusterGroup();
//     for (let t of quakearray) {
//         // each t is an array
//         // element 0 is lng, element 1 is lat
//         let lat = t.geometry.coordinates[1];
//         let lng = t.geometry.coordinates[0];
//         // let address = t.properties.description;
//         let columns = document.querySelectorAll('td');
//         let parkName = columns[6].innerHTML;
//         let marker = L.marker([lat,lng]);
//         let pop =  marker.bindPopup(`<div>
//                 <ul>
//                     <li>Park: ${parkName}</li>


//                 </ul>
//             </div>`)
//         // let dummyDiv = document.createElement('div');
//         // dummyDiv.innerHTML = t.properties.description;
//         //     let columns = dummyDiv.querySelectorAll('td');
//         //     let parkName = columns[6].innerHTML;
//         //     let pathType = columns[7].innerHTML;
//         //     let loop = columns[2].innerHTML;

//         //     marker.bindPopup(`<div>
//         //         <ul>
//         //             <li>Park: ${parkName}</li>
//         //             <li>Type: ${pathType}</li>

//         //         </ul>
//         //     </div>`)
//         // console.log(lat);
//         // console.log(lng);
//         ;
//         pop.addTo(map);

//     }
//     // markerClusterLayer.addTo(map);

// })
// // .addTo(map);




// when zoom animation finish, 
// binMap.on('zoomend', function() {
//     var currentZoom = binMap.getZoom();

//     layerGroup.eachLayer(function(layer){
//         //console.log("test==>", layer);
//         let iconType = (layer.properties.name.indexOf("ALBA")!= -1)?"images/alba.png":"images/ink.png";
//         if (currentZoom >= 13) {
//             return layer.setIcon(new DustbinBigIcon({iconUrl: iconType}))
//         }
//         else{
//             return layer.setIcon(new DustbinIcon({iconUrl: iconType}))
//         }
//     });

// });