

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


let singapore = [1.29, 103.85];

let binMap = L.map('singaporeMap', {
    center: singapore,
    zoom: 14
});


L.tileLayer('https://maps-{s}.onemap.sg/v3/Default/{z}/{x}/{y}.png', {
    detectRetina: true,
    maxZoom: 19,
    minZoom: 5,
    // attribution: '<img src="https://docs.onemap.gov.sg/maps/images/oneMap64-01.png" style="height:40px;width:40px;"/> OneMap | Map data &copy; contributors, <a href="http://SLA.gov.sg">Singapore Land Authority</a>'
}).addTo(binMap);




var recycleIcon = L.icon({

    iconUrl: 'images/recycle-bin-outline.png',
    iconSize: [14, 14],
    iconAnchor: [7, 12],
    popupAnchor: [0, -10]

});

var eIcon = L.icon({

    iconUrl: 'images/battery-outline.png',
    iconSize: [14, 14],
    iconAnchor: [7, 12],
    popupAnchor: [0, -10]

});



var lightIcon = L.icon({

    iconUrl: 'images/light-bulb-outline.png',
    iconSize: [14, 14],
    iconAnchor: [7, 12],
    popupAnchor: [0, -10]

});



var secondIcon = L.icon({

    iconUrl: 'images/second-hand-outline.png',
    iconSize: [14, 14],
    iconAnchor: [7, 12],
    popupAnchor: [0, -10]

});



// template icon for dustbin
// var DustbinBigIcon = L.Icon.extend({
//     options: {
//         iconSize: [20, 20],
//         iconAnchor: [10, 0],
//         popupAnchor: [0, 0]
//     }
// });

// var DustbinIcon = L.Icon.extend({
//     options: {
//         iconSize: [17, 17],
//         iconAnchor: [7.5, 0],
//         popupAnchor: [0, 0]
//     }
// });


// [...document.querySelectorAll('[data-bs-toggle="tooltip"]')]
//   .forEach(el => new bootstrap.Tooltip(el));



let clusterConfig = {
    spiderfyOnMaxZoom: false,
    disableClusteringAtZoom: 17
};

let clusterConfigOff = {
    spiderfyOnMaxZoom: false,
    disableClusteringAtZoom: 0
};

let commonRecycleLayer = L.markerClusterGroup(clusterConfig);
let lightingLayer = L.markerClusterGroup(clusterConfigOff);
let secondHandLayer = L.markerClusterGroup(clusterConfig);
let eWasteLayer = L.markerClusterGroup(clusterConfig);
let secondHandLayerOff = L.markerClusterGroup(clusterConfigOff);
let eWasteLayerOff = L.markerClusterGroup(clusterConfigOff);
let searchResultLayer = L.layerGroup();

let baselays = {
    'Common': commonRecycleLayer
}
let overlays = {
    'Lighting': lightingLayer,
    'Second hand': secondHandLayer,
    'E-Waste': eWasteLayer
}

document.querySelector('#btnToggle')
    .addEventListener('click', function () {

        if (binMap.hasLayer(commonRecycleLayer)) {
            binMap.removeLayer(commonRecycleLayer);
        } else {
            binMap.addLayer(commonRecycleLayer);
        }
    })

L.control.layers(baselays, overlays).addTo(binMap);
searchResultLayer.addTo(binMap);

async function getAddress(searchData) {
    let response = {status: 400};
    try {
        response = await axios.get(`https://developers.onemap.sg/commonapi/search?searchVal=${searchData}&returnGeom=Y&getAddrDetails=Y&pageNum=1`);
    } catch (e) {
        // printing error exception
        console.error(e);
    }
    return response;
}

// lightning waste start
async function lightwaste() {
    let response = await axios.get("data/lighting-waste.geojson");
    console.log(response)
    return response.data.features;

}


window.addEventListener("DOMContentLoaded", async function () {

    let lwaste_data = await lightwaste();
    // console.log(lwaste_data);

    for (let l of lwaste_data) {

        let lat = l.geometry.coordinates[1];
        let lng = l.geometry.coordinates[0];


        let dummyDiv = document.createElement('div');
        dummyDiv.innerHTML = l.properties.Description;
        let columns = dummyDiv.querySelectorAll('td');
        let description = columns[3].innerHTML;
        let bname = columns[4].innerHTML;
        let blk = columns[7].innerHTML;
        let unit = columns[5].innerHTML;
        let stname = columns[12].innerHTML;
        let postal = columns[2].innerHTML;

        let marker = L.marker([lat, lng], { icon: lightIcon });

        marker.bindPopup(`<div>
                    Description: ${description}<br>
                    Building Name: ${bname}<br>
                    Blk: ${blk}<br>
                    Unit: ${unit}<br>
                    Street Name: ${stname}<br>
                    Postal: ${postal}<br>
                
            </div>`)


        marker.addTo(lightingLayer);

    }
    lightingLayer.addTo(binMap);

});




// 2nd hand waste start
async function secondwaste() {
    let response = await axios.get("data/2ndhand.geojson");
    return response.data.features;
}


window.addEventListener("DOMContentLoaded", async function () {


    let secwaste_data = await secondwaste();
    // console.log(lwaste_data);

    for (let s of secwaste_data) {

        let lat = s.geometry.coordinates[1];
        let lng = s.geometry.coordinates[0];

        let dummyDiv = document.createElement('div');
        dummyDiv.innerHTML = s.properties.description;
        let columns = dummyDiv.querySelectorAll('td');
        let description = columns[4].innerHTML;
        let bname = columns[9].innerHTML;
        let blk = columns[10].innerHTML;
        let unit = columns[5].innerHTML;
        let stname = columns[6].innerHTML;
        let postal = columns[7].innerHTML;
        let web = columns[3].innerHTML;

        let marker = L.marker([lat, lng], { icon: secondIcon });

    //     marker.bindPopup(`<div>
        
    //         <strong>Description:</strong> ${description}<br>
    //         <strong>Building Name:</strong> ${bname}<br>
    //         <strong>Blk:</strong> ${blk}<br>
    //         <strong>Unit:</strong> ${unit}<br>
    //         <strong>Street Name:</strong> ${stname}<br>
    //         <strong>Postal:</strong> ${postal}<br>
    //         <strong>Website:</strong> ${web}<br>
        
    // </div>`)

        marker.bindPopup(`<div class="myMapToolTip">
                <strong>Description:</strong> ${description}<br>
                <strong>Building Name:</strong> ${bname}<br>
                <strong>Blk:</strong> ${blk}<br>
                <strong>Unit:</strong> ${unit}<br>
                <strong>Street Name:</strong> ${stname}<br>
                <strong>Postal:</strong> ${postal}<br>
                <strong>Website:</strong> ${web}<br>
        </div>`)


        marker.addTo(secondHandLayer);
        marker.addTo(secondHandLayerOff);

    }
    secondHandLayer.addTo(binMap);

});





//main recycling start
async function main() {
    let response = await axios.get("data/recycling.geojson");
    // console.log(response)
    return response.data.features
}



window.addEventListener("DOMContentLoaded", async function () {

    let main_data = await main();

    for (let m of main_data) {

        let lat = m.geometry.coordinates[1];
        let lng = m.geometry.coordinates[0];

        let dummyDiv = document.createElement('div');
        dummyDiv.innerHTML = m.properties.description;
        let columns = dummyDiv.querySelectorAll('td');
        let description = columns[25].innerHTML;
        let collection = columns[17].innerHTML;
        let blk = columns[5].innerHTML;
        let unit = columns[9].innerHTML;
        let stname = columns[13].innerHTML;
        let postal = columns[11].innerHTML;

        let marker = L.marker([lat, lng], { icon: recycleIcon });
        marker.bindPopup(`<div class = "recycle">
                
                    Description: ${description}<br>
                    Collection: ${collection}<br>
                    Blk: ${blk}<br>
                    Unit: ${unit}<br>
                    Street name: ${stname}<br>
                    Postal: ${postal}<br>
                
            </div>`)
        marker.addTo(commonRecycleLayer);

    }

    commonRecycleLayer.addTo(binMap);
});





// ewaste start

async function ewaste() {
    let response = await axios.get("data/ewaste-recycle.geojson");
    // console.log(response)
    return response.data.features;
}

window.addEventListener("DOMContentLoaded", async function () {

    let ewaste_data = await ewaste();


    for (let d of ewaste_data) {

        let lat = d.geometry.coordinates[1];
        let lng = d.geometry.coordinates[0];

        let dummyDiv = document.createElement('div');
        dummyDiv.innerHTML = d.properties.Description;
        let columns = dummyDiv.querySelectorAll('td');
        let description = columns[0].innerHTML;
        let bname = columns[8].innerHTML;
        let stname = columns[10].innerHTML;
        let postal = columns[3].innerHTML;


        let marker = L.marker([lat, lng], { icon: eIcon });

        marker.bindPopup(`<div>
            <strong>Description:</strong> ${description}<br>
            <strong>Building Name:</strong> ${bname}<br>
            <strong>Street Name:</strong> ${stname}<br>
            <strong>Postal:</strong> ${postal}<br></div>`)
        marker.addTo(eWasteLayer);
        marker.addTo(eWasteLayerOff);
    }
    eWasteLayer.addTo(binMap);

});



// ewaste start 2nd option

// async function ewaste() {
//     let response = await axios.get("data/ewaste-recycle.geojson");
//     // console.log(response)
//     return response.data.features;
// }

// let binData = [];
// let companyType = [];
// let markerList = [];
// // let layerGroupAlba; 
// // let layerGroup; 
// window.addEventListener("DOMContentLoaded", async function () {
//     // wait for getTaxi to finish and then store its return value
//     // into taxiCoordinates
//     let ewaste_data = await ewaste();
//     // console.log(ewaste_data);

//     for (let d of ewaste_data) {
//         // each t is an array
//         // element 0 is lng, element 1 is lat
//         let lat = d.geometry.coordinates[1];
//         let lng = d.geometry.coordinates[0];


//         let dummyDiv = document.createElement('div');
//         dummyDiv.innerHTML = d.properties.Description;
//         let columns = dummyDiv.querySelectorAll('td');
//         let binName = columns[0].innerHTML;
//         let binCollectData = columns[11].innerHTML.split(";"); // xxxx; waste: abc, 123,
//         let binCollectMethod = binCollectData[0];
//         let binCollectItemTypes = binCollectData[1].split(":")[1];
//         let binPlaceName = columns[8].innerHTML;
//         let binAddress = columns[10].innerHTML;
//         let binPostal = columns[3].innerHTML;
//         let binInfo = {
//             name: binName,
//             method: binCollectMethod,
//             collect: binCollectItemTypes,
//             place: binPlaceName,
//             address: binAddress,
//             postal: binPostal,
//             geodata: [lat, lng]
//         }
//         binData.push(binInfo);
//         //ternary check
//         let iconType = (binName.indexOf("ALBA") != -1) ? "images/battery-outline.png" : "images/battery-outline.png";
//         // let iconShadowType = (binCollectMethod.indexOf("Bin")!= -1)?"images/vehiclecollect.png":"images/mancollect.png";
//         let marker = L.marker([lat, lng], { icon: new DustbinBigIcon({ iconUrl: iconType }) });
//         marker.properties = binInfo;
//         marker.bindPopup(`<div>

//         Name: ${binName}<br>
//         Method: ${binCollectMethod}<br> 
//         Collect: ${binCollectItemTypes}<br>
//         Place: ${binPlaceName}<br>
//         Address: ${binAddress}<br>
//         Postal: ${binPostal}<br>

// </div>`)

//         // console.log(lng);

//         marker.addTo(eWasteLayer);

//     }
//     eWasteLayer.addTo(binMap);

// });

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











let isShowCluster = true;
document.querySelector('#toggle-cluster-btn').addEventListener('click', () => {
    isShowCluster = !isShowCluster;
    if (isShowCluster == true) {
        //remove non clustering layer 
        if (binMap.hasLayer(eWasteLayerOff)) {
            binMap.removeLayer(eWasteLayerOff);
        }

        if (binMap.hasLayer(secondHandLayerOff)) {
            binMap.removeLayer(secondHandLayerOff);
        }

        // adding clustering layer
        binMap.addLayer(eWasteLayer);
        binMap.addLayer(secondHandLayer);
    } else {
        //remove clustering layer 
        if (binMap.hasLayer(eWasteLayer)) {
            binMap.removeLayer(eWasteLayer);
        }

        if (binMap.hasLayer(secondHandLayer)) {
            binMap.removeLayer(secondHandLayer);
        }

        // adding non clustering layer
        binMap.addLayer(eWasteLayerOff);
        binMap.addLayer(secondHandLayerOff);

    }
});

document.querySelector('#contactButton').addEventListener('click', () => {

});
let searchLocations = async function () {
    searchResultLayer.clearLayers(); // get rid of the existing markers
    // clear our autocomplete search drop down
    let searchResultElement = document.querySelector("#search-results");
    searchResultElement.innerHTML = "";
    let searchInput = document.querySelector('#searchInput');
    if(searchInput.value == ""){
        return;
    }
    let searchMapRes = await getAddress(searchInput.value);
    

    // if status is 200 then process the address datas for user to choose
    if (searchMapRes.status == 200) {
        searchMapRes = searchMapRes.data;
        //console.log("Searching location....");
        console.log(searchMapRes)
        if (searchMapRes.found > 0) {
            //console.log("A")

            for (let foundLocation of searchMapRes.results) {
                // console.log("B")
                let coordinate = [foundLocation.LATITUDE, foundLocation.LONGITUDE];
                let resultElement = document.createElement('div');
                resultElement.innerHTML = foundLocation.SEARCHVAL;
                resultElement.className = 'search-result';
                resultElement.addEventListener('click', function () {
                    binMap.flyTo(coordinate, 18);
                    searchResultElement.innerHTML = "";
                })

                searchResultElement.appendChild(resultElement);
            }

        }
    }

}

// function ValidateEmail(mail) {
//     emailRejex
//     if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(myForm.emailAddr.value)) {
//         return (true)
//     }
//     alert("You have entered an invalid email address!")
//     return (false)
// }

// func is the callback function to be called when 300ms passes when the user stop typing
// after 300ms of afk, we will debounce to call the wanted function
// this is to prevent multiple function call per key enter
// commonly used for search bar for autocomplete features
function debounce(func, timeout = 300) {
    let timer;
    return (...args) => {
        clearTimeout(timer);
        timer = setTimeout(() => { func.apply(this, args); }, timeout);
    };
}

function clickSearchButton() {
    document.querySelector('#searchMapBtn').click();
}

const processSearch = debounce(() => clickSearchButton());
// const processSearch = debounce(() => clickSearchButton(), 500);

document.querySelector('#searchMapBtn')
    .addEventListener('click', searchLocations);

document.querySelector('#searchInput')
    .addEventListener('keyup', function (keyEvent) {
        // 13 represent the "return/enter" key
        // console.log(keyEvent);
        keyEvent.preventDefault(); // ?
        processSearch();
    });

document.querySelector('#feedbackBtn')
    .addEventListener('click', function () {

        // define the flags
        // assume the form is innocent
        // (that is no error)
        let NoInput = false;
        let emailNotValid = false;

        let form = document.querySelector('#form');
        if (!form.value) {
            NoInput = true;
        }
        // else if (form.length < 3) {
        //     TooShort = true;
        // }

        let email = document.querySelector("#email");
        // if the email contains an @ and a '.' is considered
        // to be a valid
        if (!email.value.includes('.') || !email.value.includes('@')) {
            emailNotValid = true;
        }

        let errorDiv = document.querySelector('#errors');
        // wipe out all the existing error messages
        errorDiv.innerHTML = '';
        // check if there is any error
        if (NoInput || emailNotValid) {
            errorDiv.style.display = 'block';
            if (NoInput) {
                // use += to append instead of overwrite
                errorDiv.innerHTML += `<p class="p-2">Please provide your comments</p>`;
            } if (emailNotValid) {
                errorDiv.innerHTML += '<p class="p-2">Please enter a valid email and it should contains at least one . and at least one @</p>';
            }
        }
        else{
            // Pop up submit successfully
            var myModal = new bootstrap.Modal(document.getElementById('feedBackModal'))
            email.value = "";
            form.value = "";
            myModal.show();
        }

        // console.log("Comments not provided =", NotProvided);
        // console.log("email not valid =", emailNotValid);

    })

// document.querySelector('#contactButton').addEventListener('click', () => {

// });




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

let allButtons = document.querySelectorAll('#navbar li')

for (let btn of allButtons) {
    btn.addEventListener('click', function (event) {

        let selectedBtn = event.target;
        let pageNumber = selectedBtn.dataset.page;

        let pages = document.querySelectorAll('.page');
        // hide all the pages
        for (let p of pages) {
            // it is ok to attempt to remove a class
            // from an element even if that element does not have it
            p.classList.remove('show');
            p.classList.add('hidden');
        }

        let page = document.querySelector('#page-' + pageNumber);
        page.classList.remove('hidden');
        page.classList.add('show');
    })



}
[...document.querySelectorAll('[data-bs-toggle="popover"]')]
.forEach(el => new bootstrap.Popover(el));