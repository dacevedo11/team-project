const baseURL = "https://api.jikan.moe/v4/anime";
let searchQuery = ""; // Replace this with the search query entered by the user

$("#searchButton").click(function () {
    // Get the search query from an input field or any other source
    searchQuery = $("#searchInput").val();

    // Make the request with the search query
    const settings = {
        url: `${baseURL}?q=${searchQuery}`,
        method: "GET",
        dataType: "json",
        success: searchSuccess,
        error: ajaxError
    };

    console.log("New URL:", settings.url);

    $.ajax(settings);
});

function searchSuccess(data) {
    // Check if there are search results
    if (data.data && data.data.length > 0) {
        // Clear previous results
        $("#output").empty();

        // Create a container for the gallery
        const gallery = $('<div class="gallery"></div>');

        // Loop through all the results
        data.data.forEach((result, index) => {
            // Append only the image to the gallery container
            gallery.append(`
                <div class="gallery-item">
                    <img src="${result.images.jpg.large_image_url}" alt="${result.title}">
                </div>
            `);
        });

        // Append the gallery container to the #output div
        $("#output").append(gallery);
    } else {
        $("#output").html("<p>No results found</p>");
    }
}

function ajaxError(request, status, error) {
    console.error("Oops:", request, status, error);
}

$(document).ready(function () {
    // Code to be executed when the document is ready
});
