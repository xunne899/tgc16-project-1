

let singapore = [1.29, 103.85];

let binMap = L.map('singaporeMap', {
    center: singapore,
    zoom: 15
});


L.tileLayer('https://maps-{s}.onemap.sg/v3/Default/{z}/{x}/{y}.png', {
    detectRetina: true,
    maxZoom: 19,
    minZoom: 5,
    // attribution: '<img src="https://docs.onemap.gov.sg/maps/images/oneMap64-01.png" style="height:40px;width:40px;"/> OneMap | Map data &copy; contributors, <a href="http://SLA.gov.sg">Singapore Land Authority</a>'
}).addTo(binMap);


// // #6 Get Own Location 
// navigator.geolocation.getCurrentPosition(position => {
//     // Leaflet passes the latlng in
//     const { coords: { latitude, longitude } } = position;
//     var marker = new L.marker([latitude, longitude], {
//         draggable: true,
//         autoPan: true
//     }).addTo(binMap);
// })

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
    let response = { status: 400 };
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

        // if (lat>1.05){
        // north_layer = lat.innerHTML;
        // } 
        // else if (lat<1.02){
        //     south_layer = lat.innerHTML;
        // } 
        // else{
        //        if(lat>1.08){
        //            east_layer = lat.innerHTML;
        //        }
        //        else if(lat>1.09){
        //            west_layer=lat.innerHTML;
        //        }
        //        else{
        //            central_layer = lat.innerHTML;
        //        }
        // }


        let dummyDiv = document.createElement('div');
        dummyDiv.innerHTML = l.properties.Description;
        let columns = dummyDiv.querySelectorAll('td');
        let description = columns[3].innerHTML;
        let bname = columns[4].innerHTML;
        let blk = columns[7].innerHTML;
        let unit = columns[5].innerHTML;
        let stname = columns[12].innerHTML;
        let postal = columns[2].innerHTML;

        let marker = L.marker([lat, lng], {icon: lightIcon});

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


window.addEventListener("DOMContentLoaded", async function (){


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

        let marker = L.marker([lat, lng], {icon: secondIcon});

     

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



window.addEventListener("DOMContentLoaded", async function (){

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







let isShowCluster = true;
document.querySelector('#toggle-cluster-btn').addEventListener('click', () => {
    isShowCluster = !isShowCluster;
    if (isShowCluster == true) {
        //remove non clustering layer 
        if (binMap.hasLayer(eWasteLayerOff)){
            binMap.removeLayer(eWasteLayerOff);
        }

        if (binMap.hasLayer(secondHandLayerOff)){
            binMap.removeLayer(secondHandLayerOff);
        }

        // adding clustering layer
        binMap.addLayer(eWasteLayer);
        binMap.addLayer(secondHandLayer);
    } else {
        //remove clustering layer 
        if (binMap.hasLayer(eWasteLayer)){
            binMap.removeLayer(eWasteLayer);
        }

        if (binMap.hasLayer(secondHandLayer)){
            binMap.removeLayer(secondHandLayer);
        }

        // adding non clustering layer
        binMap.addLayer(eWasteLayerOff);
        binMap.addLayer(secondHandLayerOff);

    }
});

// document.querySelector('#contactButton').addEventListener('click', () => {

// });
let searchLocations = async function () {
    searchResultLayer.clearLayers(); // get rid of the existing markers
    // clear our autocomplete search drop down
    let searchResultContainer = document.querySelector("#search-results");
    searchResultContainer.innerHTML = "";
    let searchInput = document.querySelector('#searchInput');
    if (searchInput.value == "") {
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
                 console.log("B")
                let coordinate = [foundLocation.LATITUDE, foundLocation.LONGITUDE];
                let resultElement = document.createElement('div');
                resultElement.innerHTML = foundLocation.ADDRESS;
                resultElement.className = 'search-result';
                resultElement.addEventListener('click', function(){
                    binMap.flyTo(coordinate, 18);
                    searchResultContainer.innerHTML = "";
                    // if (binMap.hasLayer(commonRecycleLayer)) {
                    //     binMap.addLayer(commonRecycleLayer);
                    // }
                    binMap.addLayer(commonRecycleLayer);
                     if (binMap.hasLayer(eWasteLayer)) {
                        binMap.removeLayer(eWasteLayer);
                    }
            
                     if (binMap.hasLayer(secondHandLayer)) {
                        binMap.removeLayer(secondHandLayer);
                    }

                    if (binMap.hasLayer(lightingLayer)) {
                        binMap.removeLayer(lightingLayer);
                    }
            
                   
                  
                })

                searchResultContainer.appendChild(resultElement);
            }
            
        }
        else{
            let resultElement = document.createElement('div');
            resultElement.innerHTML = "No results";
            resultElement.className = 'search-result errorResult';
            searchResultContainer.appendChild(resultElement);
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
    .addEventListener('click',searchLocations)


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
            // console.log(form.value)
        }
        // else if (form.length < 3) {
        //     TooShort = true;
        // }

        let email = document.querySelector("#email");
        // if the email contains an @ and a '.' is considered
        // to be a valid
        if (!email.value.includes('.') || !email.value.includes('@')) {
            emailNotValid = true;
            // console.log(email.value)
        }

      
            let review = null; // before we run the for-loop, we don't
                               // know which one has been selected
        
            // get all the radio buttons with .rating in one array
            let rb = document.querySelectorAll('.rating');
            for (let oneRating of rb) {
                // for each rating radio button, check if its .checked
                // is true
                if (oneRating.checked == true) {
                    review = oneRating.value; 
                    break;
                }
            }
        
    
            let allCheckboxes = document.getElementsByClassName('tick');
            let aboutus = [];
            for (let checkbox of allCheckboxes){
                if (checkbox.checked == true){
                    aboutus.push(checkbox.value);
                    aboutus.innerHTML += checkbox.checked
                }
           
                

               
            }

            console.log(email.value,form.value,review,aboutus);
          
        
        


        let email_error = document.querySelector('#email_errors');
        // wipe out all the existing error messages
        email_error.innerHTML = '';
        // check if there is any error
        if (emailNotValid){
            email_error.style.display = 'block';
            email_error.innerHTML += '<p class="p-2">Please enter a valid email and it should contain at least one . and at least one @</p>';
            }
        



        let input_error = document.querySelector('#input_errors');
        // wipe out all the existing error messages
        input_error.innerHTML = '';
        // check if there is any error
        if (NoInput) {
            input_error.style.display = 'block';
            // if (NoInput) {
                // use += to append instead of overwrite
                input_error.innerHTML += `<p class="p-2">Please provide your comments</p>`;
            }
        else {
            // Pop up submit successfully
            var myModal = new bootstrap.Modal(document.getElementById('feedBackModal'))
            // email.value = "";
            // form.value = "";
            myModal.show();
        }
        document.querySelector('#results').innerHTML = `
       <p style="text-align:left;">
      <strong>Email:</strong> ${email.value}<br> 
      <strong>Comments:</strong> ${form.value}<br>
      <strong>Rating:</strong> ${review}<br>
      <strong>Heard about us:</strong> ${aboutus}<br>
       </p>`
       
    


        // console.log("Comments not provided =", NotProvided);
        // console.log("email not valid =", emailNotValid);

    })

// document.querySelector('#contactButton').addEventListener('click', () => {

// });



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

// let allButtons = document.querySelectorAll('#navbar li')

// for (let btn of allButtons) {
//     btn.addEventListener('click', function (event) {

//         let selectedBtn = event.target;
//         let pageNumber = selectedBtn.dataset.page;

//         let pages = document.querySelectorAll('.page');
//         // hide all the pages
//         for (let p of pages) {
//             // it is ok to attempt to remove a class
//             // from an element even if that element does not have it
//             p.classList.remove('show');
//             p.classList.add('hidden');
//         }

//         let page = document.querySelector('#page-' + pageNumber);
//         page.classList.remove('hidden');
//         page.classList.add('show');
//     })



// }

// [...document.querySelectorAll('[data-bs-toggle="popover"]')]
//     .forEach(el => new bootstrap.Popover(el));

// document.querySelectorAll('#navbar li') -> //*[@id='navbar']/li
// searchMapBtn -> //button[@id='searchMapBtn']
  
let eWasteElem  = document.getElementById('eWasteLegend');
var eWastePopover = new bootstrap.Popover(eWasteElem);
let gWasteElem  = document.getElementById('gWasteLegend');
var gWastePopover = new bootstrap.Popover(gWasteElem);
let testThis = document.querySelector('#toggle-cluster-btn');
testThis.addEventListener('mouseover', function(){
    console.log("Hello")
    eWastePopover.show();
});
testThis.addEventListener('mouseout', function(){
    console.log("Bye")
    eWastePopover.hide();
});

let lightingSpan = document.evaluate("//div[@class='leaflet-control-layers-overlays']/label/div/span[contains(text(), 'Lighting')]", document, null, XPathResult.ANY_TYPE, null);
// lightingSpan.addEventListener('hover', function(){
//     console.log("Hello try");
//     eWastePopover.show();
// });


let secondHandSpan = document.evaluate("//div[@class='leaflet-control-layers-overlays']/label/div/span[contains(text(), 'Second')]", document, null, XPathResult.ANY_TYPE, null);

let eWasteSpan = document.evaluate("//div[@class='leaflet-control-layers-overlays']/label/div/span[contains(text(), 'E-Waste')]", document, null, XPathResult.ANY_TYPE, null);


