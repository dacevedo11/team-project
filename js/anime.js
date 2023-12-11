const baseURL = "https://api.jikan.moe/v4/anime";
let searchQuery = "";
let currentIndex = 0;
let searchData; // Global variable to store search results

$("#searchButton").click(function () {
    searchQuery = $("#searchInput").val();
    currentIndex = 0;
    makeRequest();
});

function makeRequest() {
    const settings = {
        url: `${baseURL}?q=${searchQuery}`,
        method: "GET",
        dataType: "json",
        success: searchSuccess,
        error: ajaxError
    };

    console.log("New URL:", settings.url);

    $.ajax(settings);
}

function searchSuccess(data) {
    if (data.data && data.data.length > 0) {
        searchData = data; // Store the search results globally

        $("#output").empty();

        const result = data.data[currentIndex];
        const animeInfo = {
            title: result.title_english,
            type: result.type,
            episodes: result.episodes,
            status: result.status,
            duration: result.duration,
            rating: result.rating,
            score: result.score,
            scoredBy: result.scored_by,
            synopsis: result.synopsis,
            year: result.year,
            imageURL: result.images.jpg.large_image_url,
        };

        $("#output").append(`
            <div class="result">
                <h1 id="anime-title">${animeInfo.title}</h1>
                <img src="${animeInfo.imageURL}" alt="${animeInfo.title}" id="anime-img">
                <p>Type: ${animeInfo.type}</p>
                <p>Episodes: ${animeInfo.episodes}</p>
                <p>Status: ${animeInfo.status}</p>
                <p>Duration: ${animeInfo.duration}</p>
                <p>Rating: ${animeInfo.rating}</p>
                <p>Score: ${animeInfo.score} (Scored by ${animeInfo.scoredBy} users)</p>
                <p>Air Date: ${animeInfo.year}</p>
                <p>Synopsis: ${animeInfo.synopsis}</p>
            </div>
        `);

        $("#index-buttons").html(`
            <button id="prevButton" class="new-button" onclick="prevResult()">Previous</button>
            <button id="nextButton" class="new-button" onclick="nextResult()">Next</button>
        `);

        $("#prevButton").prop("disabled", currentIndex === 0);
        $("#nextButton").prop("disabled", currentIndex === data.data.length - 1);
    } else {
        $("#output").html("<p>No results found</p>");
    }
}

function prevResult() {
    if (currentIndex > 0) {
        currentIndex--;
        makeRequest();
    }
}

function nextResult() {
    if (currentIndex < searchData.data.length - 1) {
        currentIndex++;
        makeRequest();
    }
}

function ajaxError(request, status, error) {
    console.error("Oops:", request, status, error);
}
