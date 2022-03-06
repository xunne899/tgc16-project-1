

let singapore = [1.29, 103.85];

let binMap = L.map('singaporeMap', {
    center: singapore,
    zoom: 15,
    zoomControl: false,
    scrollWheelZoom :true,
    
});


L.tileLayer('https://maps-{s}.onemap.sg/v3/Default/{z}/{x}/{y}.png', {
    detectRetina: true,
    maxZoom: 19,
    minZoom: 9,
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
let secondHandNonClusterLayer = L.markerClusterGroup(clusterConfigOff);
let eWasteNonClusterLayer = L.markerClusterGroup(clusterConfigOff);
//let searchResultLayer = L.layerGroup();

let baselays = {
    'Common': commonRecycleLayer
}
let overlays = {
    'Lighting': lightingLayer,
    'Second hand': secondHandLayer,
    'E-Waste': eWasteLayer
}

let overlaysOff = {
    'Lighting': lightingLayer,
    'Second hand -': secondHandNonClusterLayer,
    'E-Waste -': eWasteNonClusterLayer
}


//overlayer filter
let controlCluster = L.control.layers(baselays, overlays); // config for control
let controlNonCluster = L.control.layers(baselays, overlaysOff); // config for control
controlCluster.addTo(binMap)


// document.getElementById("singaporeMap").addEventListener("keydown", function(keyEvent) {
//     //console.log(keyEvent);
//     if(keyEvent.ctrlKey == true){
//         binMap.scrollWheelZoom.enable();
//     }
// });

// document.getElementById("singaporeMap").addEventListener("keyup", function(keyEvent) {
//     //console.log(keyEvent);
//     if(keyEvent.ctrlKey == false){
//         binMap.scrollWheelZoom.disable();
//     }
//     //document.getElementById("hometb").style.color = "green";
// });

// home
document.getElementById("hometb").addEventListener("mouseover", function() {
    document.getElementById("hometb").style.color = "green";
});
    
document.getElementById("hometb").addEventListener("mouseout", function() {
    document.getElementById("hometb").style.color = "#D8F3DC";
});

// about us
document.getElementById("abouttb").addEventListener("mouseover", function() {
    document.getElementById("abouttb").style.color = "green";
});

document.getElementById("abouttb").addEventListener("mouseout", function() {
    document.getElementById("abouttb").style.color = "#D8F3DC";
});

//  map   
document.getElementById("maptb").addEventListener("mouseover", function() {
    document.getElementById("maptb").style.color = "green";
});


document.getElementById("maptb").addEventListener("mouseout", function() {
    document.getElementById("maptb").style.color = "#D8F3DC";
});
    
// contact us
document.getElementById("contacttb").addEventListener("mouseover", function() {
    document.getElementById("contacttb").style.color = "green";
});

document.getElementById("contacttb").addEventListener("mouseout", function() {
    document.getElementById("contacttb").style.color = "#D8F3DC";
});






// Legend Elements
let gWasteElem = document.getElementById('gWasteLegend');
let eWasteElem = document.getElementById('eWasteLegend');
let lightingElem = document.getElementById('lightingLegend');
let secondHandElem = document.getElementById('secondHandLegend');
gWasteElem.style.opacity = 1.0;
eWasteElem.style.opacity = 1.0;
lightingElem.style.opacity = 1.0;
secondHandElem.style.opacity = 1.0;

// Tooltips are opt-in for performance reasons, so you must initialize them yourself.
let gWastePopover = new bootstrap.Popover(gWasteElem);
let eWastePopover = new bootstrap.Popover(eWasteElem);
let lightingPopover = new bootstrap.Popover(lightingElem);
let secondHandPopover = new bootstrap.Popover(secondHandElem);


// General waste button
let generalWasteBtn = document.querySelector('#btnToggle');
generalWasteBtn.innerHTML = "Hide General Waste";
generalWasteBtn.setAttribute("class", "btn btn-danger btn-sm ms-2 mb-1 mt-2");
generalWasteBtn.addEventListener('click', function () {

    if (binMap.hasLayer(commonRecycleLayer)) {
        binMap.removeLayer(commonRecycleLayer);
        generalWasteBtn.innerHTML = "Show General Waste";
        generalWasteBtn.setAttribute("class", "btn btn-success btn-sm ms-2 mb-1 mt-2");
    } else {
        binMap.addLayer(commonRecycleLayer);
        generalWasteBtn.innerHTML = "Hide General Waste";
        generalWasteBtn.setAttribute("class", "btn btn-danger btn-sm ms-2 mb-1 mt-2");
    }
})






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
        <strong>Description:</strong> ${description}<br>
        <strong>Building Name:</strong> ${bname}<br>
        <strong>Blk:</strong> ${blk}<br>
        <strong>Unit:</strong> ${unit}<br>
        <strong>Street Name:</strong> ${stname}<br>
        <strong>Postal:</strong> ${postal}<br>
                
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
        marker.addTo(secondHandNonClusterLayer);

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
                
                    <strong>Description:</strong> ${description}<br>
                    <strong>Collection:</strong> ${collection}<br>
                    <strong>Blk:</strong> ${blk}<br>
                    <strong>Unit:</strong> ${unit}<br>
                    <strong>Street name:</strong> ${stname}<br>
                    <strong>Postal:</strong> ${postal}<br>
                
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
        marker.addTo(eWasteNonClusterLayer);
    }
    eWasteLayer.addTo(binMap);

});




//subscribe email start
document.querySelector('#subscribeBtn')
    .addEventListener('click', function () {


        let subscribemailNotValid = false;

        let subscribe = document.querySelector("#subscribe");
        // if the email contains an @ and a '.' is considered
        // to be a valid
        if (!subscribe.value.includes('.') || !subscribe.value.includes('@') || !subscribe.value) {
            subscribemailNotValid = true;
            // console.log(email.value)
        }
        else {
            alert(
                `
            ${subscribe.value}
             We have received your subscription. Thank you.`)
             subscribe.value ='';
        }


        let subscribe_error = document.querySelector('#subscribe_error');
        // wipe out all the existing error messages
        subscribe_error.innerHTML = '';
        // check if there is any error
        if (subscribemailNotValid) {
            subscribe_error.style.display = 'block';
            subscribe_error.innerHTML += '<p class="p-2">Please enter a valid email'
        }


    })



//toggle cluster btn

let isShowCluster = true;
let showClusterButton = document.querySelector('#toggle-cluster-btn');
showClusterButton.innerHTML = "Hide Cluster";
showClusterButton.setAttribute("class", "btn btn-danger btn-sm ms-2 mb-1 mt-2");

showClusterButton.addEventListener('click', () => {
    isShowCluster = !isShowCluster;
    if (isShowCluster == true) {
        showClusterButton.innerHTML = "Hide Cluster";
        showClusterButton.setAttribute("class", "btn btn-danger btn-sm ms-2 mb-1 mt-2");
        binMap.removeControl(controlNonCluster);
        controlCluster.addTo(binMap);

        //remove non clustering layer 
        if (eWasteElem.style.opacity >= 1) {
            if (binMap.hasLayer(eWasteNonClusterLayer)) {
                binMap.removeLayer(eWasteNonClusterLayer);
            }
            // adding clustering layer
            binMap.addLayer(eWasteLayer);
        }

        if (secondHandElem.style.opacity >= 1) {
            if (binMap.hasLayer(secondHandNonClusterLayer)) {
                binMap.removeLayer(secondHandNonClusterLayer);
            }

            // adding clustering layer
            binMap.addLayer(secondHandLayer);
        }


    } else {
        binMap.removeControl(controlCluster);
        controlNonCluster.addTo(binMap);
        showClusterButton.innerHTML = "Show Cluster";
        showClusterButton.setAttribute("class", "btn btn-success btn-sm ms-2 mb-1 mt-2");

        if (eWasteElem.style.opacity >= 1) {
            //remove clustering layer 
            if (binMap.hasLayer(eWasteLayer)) {
                binMap.removeLayer(eWasteLayer);
            }
            // adding non clustering layer
            binMap.addLayer(eWasteNonClusterLayer);
        }

        if (secondHandElem.style.opacity >= 1) {
            if (binMap.hasLayer(secondHandLayer)) {
                binMap.removeLayer(secondHandLayer);
            }

            // adding non clustering layer
            binMap.addLayer(secondHandNonClusterLayer);
        }

    }
});


//searchResultLayer.addTo(binMap);

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


//searchlocation bar
let searchLocations = async function () {
    //searchResultLayer.clearLayers(); // get rid of the existing markers
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
                resultElement.addEventListener('click', function () {
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
        else {
            let resultElement = document.createElement('div');
            resultElement.innerHTML = "No results";
            resultElement.className = 'search-result errorResult';
            searchResultContainer.appendChild(resultElement);
        }
    }

}



//debounce search bar 

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

const processSearch = debounce(searchLocations);

document.querySelector('#searchMapBtn')
    .addEventListener('click', searchLocations);


document.querySelector('#searchInput')
    .addEventListener('keyup', function (keyEvent) {
        // 13 represent the "return/enter" key
        // console.log(keyEvent);
        // eyEvent.preventDefault()k; // ?
        processSearch();
    });



// submit feedback/comments
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

        let feedBackSelect = document.querySelector("#feedbackType");

        let email = document.querySelector("#email");
        // if the email contains an @ and a '.' is considered
        // to be a valid
        if (!email.value.includes('.') || !email.value.includes('@') || !email.value) {
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
        for (let checkbox of allCheckboxes) {
            if (checkbox.checked == true) {
                aboutus.push(checkbox.value);
                // aboutus.innerHTML += checkbox.checked
            }


        }

        console.log(email.value, form.value, review, aboutus);



        let email_error = document.querySelector('#email_errors');
        // wipe out all the existing error messages
        email_error.innerHTML = '';
        // check if there is any error
        if (emailNotValid) {
            email_error.style.display = 'block';
            email_error.innerHTML += '<p class="p-2">Please enter a valid email and it should contain one . and one @</p>';
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
        if(aboutus == ""){
            aboutus = "-"
        }
        document.querySelector('#results').innerHTML = `
       <p style="text-align:left;">
      <strong>Email:</strong> ${email.value}<br> 
      <strong>Enquiry Type:</strong> ${feedBackSelect.value}<br>
      <strong>Comments:</strong> ${form.value}<br>
      <strong>Rating:</strong> ${review}<br>
      <strong>Heard about us:</strong> ${aboutus}<br>
       </p>`


    })


//legendicons start
gWasteElem.addEventListener('click', function () {

    if (binMap.hasLayer(commonRecycleLayer)) {
        binMap.removeLayer(commonRecycleLayer);
        gWasteElem.style.opacity = 0.5;
    } else {
        binMap.addLayer(commonRecycleLayer);
        gWasteElem.style.opacity = 1;
    }
});

lightingElem.addEventListener('click', function () {

    if (binMap.hasLayer(lightingLayer)) {
        binMap.removeLayer(lightingLayer);
        lightingElem.style.opacity = 0.5;
    } else {
        binMap.addLayer(lightingLayer);
        lightingElem.style.opacity = 1;
    }
});


secondHandElem.addEventListener('click', function () {
    if (isShowCluster == true) {
        if (binMap.hasLayer(secondHandLayer)) {
            binMap.removeLayer(secondHandLayer);
            secondHandElem.style.opacity = 0.2;
        }
        else {
            binMap.addLayer(secondHandLayer);
            secondHandElem.style.opacity = 1;
        }
    }
    else {
        if (binMap.hasLayer(secondHandNonClusterLayer)) {
            binMap.removeLayer(secondHandNonClusterLayer);
            secondHandElem.style.opacity = 0.2;
        }
        else {
            binMap.addLayer(secondHandNonClusterLayer);
            secondHandElem.style.opacity = 1;
        }
    }
});







eWasteElem.addEventListener('click', function () {

    // eWastePopover.show();
    if (isShowCluster) {
        if (binMap.hasLayer(eWasteLayer)) {
            // icon is light up, so we off it
            binMap.removeLayer(eWasteLayer);
            eWasteElem.style.opacity = 0.2;
        }
        else {
            // icon is off, so we on it
            binMap.addLayer(eWasteLayer);
            eWasteElem.style.opacity = 1;
        }
    }
    else {
        if (binMap.hasLayer(eWasteNonClusterLayer)) {
            binMap.removeLayer(eWasteNonClusterLayer);
            eWasteElem.style.opacity = 0.2;
        }
        else {
            binMap.addLayer(eWasteNonClusterLayer);
            eWasteElem.style.opacity = 1;
        }
    }
});



