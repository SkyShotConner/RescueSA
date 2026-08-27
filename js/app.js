/* =========================================
   RescueSA Phase 1 JavaScript
   ========================================= */


/* MOBILE MENU */

function toggleMenu() {

    const menu = document.getElementById("navMenu");

    if (!menu) return;

    menu.classList.toggle("open");

}


/* =========================================
   HOMEPAGE SEARCH
   ========================================= */

function searchServices() {

    const input = document.getElementById("searchInput");

    if (!input) return;

    const query = input.value.trim();

    if (query.length === 0) {

        window.location.href = "services.html";

        return;

    }

    window.location.href =
        "services.html?search=" +
        encodeURIComponent(query);

}


/* =========================================
   DIRECTORY FILTER
   ========================================= */

function filterDirectory() {

    const searchInput =
        document.getElementById("directorySearch");

    const filter =
        document.getElementById("serviceFilter");

    const results =
        document.querySelectorAll(".service-result");


    if (!searchInput || !filter) return;


    const search =
        searchInput.value.toLowerCase().trim();

    const type =
        filter.value;


    results.forEach(result => {

        const text =
            result.innerText.toLowerCase();

        const resultType =
            result.dataset.type;


        const matchesSearch =
            text.includes(search);

        const matchesType =
            type === "all" ||
            resultType === type;


        if (matchesSearch && matchesType) {

            result.style.display = "flex";

        } else {

            result.style.display = "none";

        }

    });

}


/* =========================================
   LOAD SEARCH FROM URL
   ========================================= */

function loadURLSearch() {

    const params =
        new URLSearchParams(window.location.search);

    const search =
        params.get("search");


    const input =
        document.getElementById("directorySearch");


    if (search && input) {

        input.value = search;

        filterDirectory();

    }

}


/* =========================================
   FIND NEAR ME
   ========================================= */

function findNearMe() {

    if (!navigator.geolocation) {

        alert(
            "Location services are not supported by your browser."
        );

        return;

    }


    navigator.geolocation.getCurrentPosition(

        function(position) {

            const latitude =
                position.coords.latitude;

            const longitude =
                position.coords.longitude;


            alert(
                "Location found!\n\n" +
                "Latitude: " +
                latitude.toFixed(5) +
                "\nLongitude: " +
                longitude.toFixed(5) +
                "\n\nNearby-service mapping will be connected in Phase 2."
            );

        },


        function() {

            alert(
                "We couldn't access your location. " +
                "Please allow location access in your browser."
            );

        }

    );

}


/* =========================================
   INITIALIZE
   ========================================= */

document.addEventListener(
    "DOMContentLoaded",
    function() {

        loadURLSearch();

    }
);
