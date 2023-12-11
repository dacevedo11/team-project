const baseURL = "https://api.jikan.moe/v4/top/anime"; // Using the top anime endpoint

function loadGallery() {
    fetch('https://api.jikan.moe/v4/top/anime')
        .then(response => response.json())
        .then(data => searchSuccess(data))
        .catch(error => ajaxError(error));
}

function searchSuccess(data) {
    // Rest of your code
}

function ajaxError(error) {
    console.error("Error fetching data:", error);
}

document.addEventListener('DOMContentLoaded', (event) => {
    loadGallery();
});


